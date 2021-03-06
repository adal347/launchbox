import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CuentasCobrarProvider } from '../../providers/cuentas_cobrar';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the CuentasCobrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuentas-cobrar',
  templateUrl: 'cuentas-cobrar.html',
})
export class CuentasCobrarPage {

  accountsReceivable: Observable<any[]>;
  service: any;
  accountReceivableToDelete: any;
  month: any;
  amount: number = 0;
  extras: number = 0;
  chargedTotal: number = 0;
  activeBoxes: number = 0;
  takenBoxes: number = 0;
  coworkingBoxes: number = 0;
  virtualBoxes: number = 0;
  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cuentasCobrarProvider: CuentasCobrarProvider,
              public modalCtrl : ModalController) {
  	this.accountsReceivable = this.cuentasCobrarProvider.getAccountsReceivable();
    this.service = {};
    this.accountReceivableToDelete = {};
    this.month = 'Junio';
    this.totalAmount();
    this.totalExtras();
    this.numActiveBoxes();
    this.numTakenBoxes();
    this.numCowrokingBoxes();
    this.numVirtualBoxes();
    this.totalCharged();
  }

  initModal(type, service) {
  	if (type == 1) {
      this.service = {};
  		this.title = 'Registrar nuevo servicio';
  	} else if (type == 0) {
      this.service = service;
  		this.title = 'Actualizar servicio';
  	}
    let modalPage = this.modalCtrl.create('ModalAccountsPage', { title: this.title, service: this.service });
    modalPage.present();
  }

  deleteEntry() {
    this.cuentasCobrarProvider.removeEntry(this.accountReceivableToDelete);
  }

  updatePay(accountReceivable) {
    if (accountReceivable.paymentMade) {
      let payDate = new Date();
      accountReceivable['payDate'] = payDate;
    } else {
      accountReceivable['payDate'] = null;
    }
    this.cuentasCobrarProvider.updateAccountReceivable(accountReceivable);
  }

  totalAmount(){
     this.accountsReceivable.forEach((arrayAccounts)=>{
       this.amount = 0;
       arrayAccounts.forEach((account)=>{

         if(account.amount){
          this.amount += Number(account.amount);
         }
       })
     });
  }

  totalExtras(){
     this.accountsReceivable.forEach((arrayAccounts)=>{
       this.extras = 0;
       arrayAccounts.forEach((account)=>{

         if(account.extras){
          this.extras += Number(account.extras);
         }
       })
     });
  }

  totalCharged(){
     this.accountsReceivable.forEach((arrayAccounts)=>{
       this.chargedTotal = 0;
       arrayAccounts.forEach((account)=>{

         if(account.charged){

          this.chargedTotal += Number(account.charged);
         }
       })
     });
  }

  numActiveBoxes(){
    this.accountsReceivable.forEach((arrayAcounts)=>{
      this.activeBoxes = 0;
      arrayAcounts.forEach((account)=>{
        if(account.statusBox === "activo"){
          this.activeBoxes ++;
        }
      })
    });
  }

  numTakenBoxes(){
    this.accountsReceivable.forEach((arrayAcounts)=>{
      this.takenBoxes = 0;
      arrayAcounts.forEach((account)=>{
        if(account.statusBox === "apartado"){
          this.takenBoxes ++;
        }
      })
    });
  }

  numCowrokingBoxes(){
    this.accountsReceivable.forEach((arrayAcounts)=>{
      this.coworkingBoxes = 0;
      arrayAcounts.forEach((account)=>{
        if(account.statusBox === "coworking"){
          this.coworkingBoxes++;
        }
      })
    });
  }

  numVirtualBoxes(){
    this.accountsReceivable.forEach((arrayAcounts)=>{
      this.virtualBoxes = 0;
      arrayAcounts.forEach((account)=>{
        if(account.statusBox === "virtual"){
          this.virtualBoxes++;
        }
      })
    });
  }

  floor(number) {
      return Math.floor(number);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasCobrarPage');
  }

}
