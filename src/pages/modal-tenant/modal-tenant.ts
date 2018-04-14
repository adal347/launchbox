import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ViewController } from 'ionic-angular';
import { CommonsProvider } from '../../providers/commons';
import { TenantsProvider } from '../../providers/tenants';

/**
 * Generated class for the ModalTenantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-tenant',
  templateUrl: 'modal-tenant.html',
})
export class ModalTenantPage {
  title: any;
  tenant: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private tenantsProvider: TenantsProvider, public viewCtrl: ViewController,
              private commons: CommonsProvider) {
    this.title = this.navParams.get('title');
    this.tenant = this.navParams.get('tenant');
  }

  submitTenant() {
    if (this.title === 'Actualizar inquilino') {
      this.updateTenant();
    } else {
      this.registerTenant();
    }
  }

  registerTenant() {
    this.tenantsProvider.createTenant(this.tenant).then(() => {
      this.commons.createAlert('Registro Exitoso', 'El inquilino se registro correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al registrar al inquilino');
    });
  }

  updateTenant() {
    this.tenantsProvider.updateTenant(this.tenant).then(() => {
      this.commons.createAlert('Actualización Exitosa', 'El inquilino se actualizo correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al actualizar al inquilino');
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalTenantPage');
  }

}
