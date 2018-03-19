import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CuentasCobrarProvider } from '../../providers/cuentas_cobrar';
import { CuentasPagarProvider } from '../../providers/cuentas_pagar';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cuentasCobrarProvider: CuentasCobrarProvider,
              public cuentasPagarProvider: CuentasPagarProvider) {
    this.typePay = this.cuentasCobrarProvider.getTypePay();
    this.bills = this.cuentasPagarProvider.getBills();
  	this.title= 'Ingreso de nuevo servicio';
    this.service = {};
  }

  initModal(type) {
  	this.show = false;
  	if (type == 1) {
  		this.title = 'Ingreso de nuevo servicio';
  	}
  	else if (type == 0) {
  		this.title = 'Editar servicio';
  	}
  	else{
  		this.title = 'Ver detalles del servicio';
  		this.show = true;
  	}
  	// $('#newEntryModal').modal();
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
    // this.cuentasPagarProvider.createNewEntry(this.service);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasPagarPage');
  }

}
