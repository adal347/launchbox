import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonsProvider } from '../../providers/commons';
import { CuentasCobrarProvider } from '../../providers/cuentas_cobrar';
import { TenantsProvider } from '../../providers/tenants';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ModalAccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-accounts',
  templateUrl: 'modal-accounts.html',
})
export class ModalAccountsPage {
  title: any;
  service: any;
  boxes: Observable<any[]>;
  tenants: Observable<any[]>;
  statusBoxes: Observable<any[]>;
  typeBoxes: Observable<any[]>;
  typePay: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, private commons: CommonsProvider,
              public cuentasCobrarProvider: CuentasCobrarProvider,
              public tenantsProvider: TenantsProvider) {
    this.title = this.navParams.get('title');
    this.service = this.navParams.get('service');
    this.boxes = this.cuentasCobrarProvider.getBoxes();
    this.statusBoxes = this.cuentasCobrarProvider.getBoxStatus();
    this.typeBoxes = this.cuentasCobrarProvider.getTypeBox();
    this.tenants = this.tenantsProvider.getTenants();
    this.typePay = this.cuentasCobrarProvider.getTypePay();
  }

  submitService() {
    if (this.title === 'Actualizar servicio') {
      this.updateService();
    } else {
      this.registerService();
    }
  }

  registerService() {
    this.cuentasCobrarProvider.createService(this.service).then(() => {
      this.commons.createAlert('Registro Exitoso', 'La cuenta se registro correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al registrar la cuenta');
    });
  }

  updateService() {
    this.cuentasCobrarProvider.updateAccountReceivable(this.service).then(() => {
      this.commons.createAlert('Actualización Exitosa', 'La cuenta se actualizo correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al actualizar la cuenta');
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAccountsPage');
  }

}
