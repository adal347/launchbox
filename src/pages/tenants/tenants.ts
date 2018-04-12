import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TenantsProvider } from '../../providers/tenants';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the TenantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tenants',
  templateUrl: 'tenants.html',
})
export class TenantsPage {
  tenant: any;
  tenants: Observable<any[]>;
  title: any;
  tenantToDelete: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tenantsProvider: TenantsProvider) {
    this.tenant = {};
    this.tenants = this.tenantsProvider.getTenants();
  }

  initModal(type, tenant) {
  	if (type == 1) {
      this.tenant = {};
  		this.title = 'Registrar nuevo inquilino';
  	} else if (type == 0) {
      this.tenant = tenant;
  		this.title = 'Actualizar inquilino';
  	}
  }

  registerTenant(){
    this.tenantsProvider.createTentant(this.tenant);
  }

  deleteTenant() {
    this.tenantsProvider.removeTenant(this.tenantToDelete);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TenantsPage');
  }

}
