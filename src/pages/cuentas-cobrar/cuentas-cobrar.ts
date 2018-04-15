import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  boxes: Observable<any[]>
  statusBoxes: Observable<any[]>;
  typeBoxes: Observable<any[]>;
  typePay: Observable<any[]>;
  accountsReceivable: Observable<any[]>;
  service: any;
  accountReceivableToDelete: any;
  month: any;
  amount: number = 0;
  activeBoxes: number = 0;
  takenBoxes: number = 0;
  freeBoxes: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cuentasCobrarProvider: CuentasCobrarProvider) {
    this.boxes = this.cuentasCobrarProvider.getBoxes();
  	this.statusBoxes = this.cuentasCobrarProvider.getBoxStatus();
  	this.typeBoxes = this.cuentasCobrarProvider.getTypeBox();
  	this.typePay = this.cuentasCobrarProvider.getTypePay();
  	this.accountsReceivable = this.cuentasCobrarProvider.getAccountsReceivable();
    this.service = {};
    this.accountReceivableToDelete = {};
    this.month = 'Marzo';
    this.totalAmount();
    this.numActiveBoxes();
    this.numTakenBoxes();
    this.numFreeBoxes();
  }

  createNewEntry() {
    this.cuentasCobrarProvider.createNewEntry(this.service);
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
       arrayAccounts.forEach((account)=>{

         if(account.amount){
          this.amount += Number(account.amount);
         }
       })
     });
  }
  numActiveBoxes(){
    this.accountsReceivable.forEach((arrayAcounts)=>{
      arrayAcounts.forEach((account)=>{
        if(account.box.status.name === "activo"){
          this.activeBoxes ++;
        }
      })
    });
  }
  numTakenBoxes(){
    this.accountsReceivable.forEach((arrayAcounts)=>{
      arrayAcounts.forEach((account)=>{
        if(account.box.status.name === "apartado"){
          this.takenBoxes ++;
        }
      })
    });
  }
  numFreeBoxes(){
    this.accountsReceivable.forEach((arrayAcounts)=>{
      arrayAcounts.forEach((account)=>{
        if(account.box.status.name === "inactivo"){
          this.freeBoxes ++;
        }
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasCobrarPage');
  }

}
