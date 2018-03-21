import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CuentasCobrarProvider } from '../../providers/cuentas_cobrar';
import { CuentasPagarProvider } from '../../providers/cuentas_pagar';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the CuentasPagarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuentas-pagar',
  templateUrl: 'cuentas-pagar.html',
})
export class CuentasPagarPage {

  typePay: Observable<any[]>;
  bills: Observable<any[]>;
  title: any;
  show: any;
  service: any;
  billToDelete: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cuentasCobrarProvider: CuentasCobrarProvider,
              public cuentasPagarProvider: CuentasPagarProvider) {
    this.typePay = this.cuentasCobrarProvider.getTypePay();
    this.bills = this.cuentasPagarProvider.getBills();
  	this.title= 'Ingreso de nuevo servicio';
    this.service = {};
    this.billToDelete = {};
  }

  initModal(type, bill) {
  	this.show = false;
    this.service = {};
  	if (type == 1) {
  		this.title = 'Ingreso de nuevo servicio';

  	} else if (type == 0) {
      this.service = bill;
  		this.title = 'Editar servicio';
  	} else{
      this.show = true;
      this.service = bill;
  		this.title = 'Ver detalles del servicio';
  	}
  }

  submitService() {
    if (this.title === 'Editar servicio') {
      this.updateEntry();
    } else {
      this.createNewEntry();
    }
  }

  createNewEntry() {
    this.cuentasPagarProvider.createNewEntry(this.service);
  }

  updateEntry() {
    this.cuentasPagarProvider.updateBill(this.service);
  }

  deleteEntry() {
    this.cuentasPagarProvider.removeBill(this.billToDelete);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasPagarPage');
  }

}
