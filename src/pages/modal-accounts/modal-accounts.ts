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
  boxes: any[];
  tenants: Observable<any[]>;
  statusBoxes: any[];
  typeBoxes: any[];
  typePay: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, private commons: CommonsProvider,
              public cuentasCobrarProvider: CuentasCobrarProvider,
              public tenantsProvider: TenantsProvider) {
    this.title = this.navParams.get('title');
    this.service = this.navParams.get('service');
    this.boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                  28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];
    this.statusBoxes = ['activo', 'inactivo', 'apartado', 'coworking', 'virtual'];
    this.typeBoxes = ['FRUIT BOX', 'SPROUT BOX', 'DOUBLE SPROUT BOX', 'SEED BOX'];
    this.tenants = this.tenantsProvider.getTenants();
    this.typePay = ['Transfer', 'Efectivo'];
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
