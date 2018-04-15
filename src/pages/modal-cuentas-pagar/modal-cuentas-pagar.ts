import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonsProvider } from '../../providers/commons';
import { CuentasPagarProvider } from '../../providers/cuentas_pagar';
import { CuentasCobrarProvider } from '../../providers/cuentas_cobrar';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-modal-cuentas-pagar',
  templateUrl: 'modal-cuentas-pagar.html',
})
export class ModalCuentasPagarPage {
	title: any;
	service: any;
  typePay: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private cuentasPagarProvider: CuentasPagarProvider, public cuentasCobrarProvider: CuentasCobrarProvider, public viewCtrl: ViewController,
              private commons: CommonsProvider) {
  	this.title = this.navParams.get('title');
    this.service = this.navParams.get('service');
    this.typePay = this.cuentasCobrarProvider.getTypePay();
  }

  submitService() {
    if (this.title === 'Editar servicio') {
      this.updateEntry();
    } else {
      this.createNewEntry();
    }
  }
  createNewEntry() {
    this.cuentasPagarProvider.createNewEntry(this.service).then(() => {
      this.commons.createAlert('Registro Exitoso', 'El servicio se registró correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al registrar el servicio');
    });
    
  }

  updateEntry() {
    this.cuentasPagarProvider.updateBill(this.service).then(() => {
      this.commons.createAlert('Actualización exitosa', 'El servicio se actualizó correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al actualizar el servicio');
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCuentasPagarPage');
  }

}
