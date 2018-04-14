import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonsProvider } from '../../providers/commons';
import { TenantsProvider } from '../../providers/tenants';

/**
 * Generated class for the ModalIncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-income',
  templateUrl: 'modal-income.html',
})
export class ModalIncomePage {
  title: any;
  income: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private tenantsProvider: TenantsProvider, public viewCtrl: ViewController,
              private commons: CommonsProvider) {
    this.title = this.navParams.get('title');
    this.income = this.navParams.get('income');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalIncomePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
