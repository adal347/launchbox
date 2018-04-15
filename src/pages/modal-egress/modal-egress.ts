import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalEgressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-egress',
  templateUrl: 'modal-egress.html',
})
export class ModalEgressPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.title = this.navParams.get('title');
    this.egress = this.navParams.get('egress');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalEgressPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
