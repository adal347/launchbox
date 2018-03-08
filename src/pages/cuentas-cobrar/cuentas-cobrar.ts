import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { CuentasCobrarProvider } from '../../providers/cuentas_cobrar';
import { Observable } from 'rxjs/Observable';

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

  boxes: Observable<any[]>
  statusBoxes: Observable<any[]>;
  typeBoxes: Observable<any[]>;
  typePago: Observable<any[]>;
  service: any;

  constructor(public db:AngularFireDatabase, public navCtrl: NavController,
              public navParams: NavParams, public cuentasCobrarProvider: CuentasCobrarProvider) {
    this.boxes = this.cuentasCobrarProvider.getBoxes();
  	this.statusBoxes = this.cuentasCobrarProvider.getBoxStatus();
  	this.typeBoxes = this.cuentasCobrarProvider.getTypeBox();
  	this.typePago = this.cuentasCobrarProvider.getTypePay();
    this.service = {};
  }

  createNewEntry() {
  	//this.boxesRef.update();
    this.cuentasCobrarProvider.createNewEntry(this.service);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasCobrarPage');
  }

}
