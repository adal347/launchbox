import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the CondensadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-condensado',
  templateUrl: 'condensado.html',
})
export class CondensadoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  downloadPDF() {
  	window.print();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CondensadoPage');
  }

}
