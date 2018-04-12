import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ViewController } from 'ionic-angular';
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
              private tenantsProvider: TenantsProvider, public viewCtrl: ViewController) {
    this.title = this.navParams.get('title');
    this.tenant = this.navParams.get('tenant');
  }

  registerTenant(){
    this.tenantsProvider.createTentant(this.tenant);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalTenantPage');
  }

}
