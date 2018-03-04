import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AngularFireDatabase} from 'angularfire2/database';

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

  constructor(/*public db:AngularFireDatabase, */public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasCobrarPage');
  }

}
