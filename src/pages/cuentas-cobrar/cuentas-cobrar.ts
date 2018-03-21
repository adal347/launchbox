import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  typePay: Observable<any[]>;
  accountsReceivable: Observable<any[]>;
  service: any;
  accountReceivableToDelete: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cuentasCobrarProvider: CuentasCobrarProvider) {
    this.boxes = this.cuentasCobrarProvider.getBoxes();
  	this.statusBoxes = this.cuentasCobrarProvider.getBoxStatus();
  	this.typeBoxes = this.cuentasCobrarProvider.getTypeBox();
  	this.typePay = this.cuentasCobrarProvider.getTypePay();
  	this.accountsReceivable = this.cuentasCobrarProvider.getAccountsReceivable();
    this.service = {};
    this.accountReceivableToDelete = {};
  }

  createNewEntry() {
    this.cuentasCobrarProvider.createNewEntry(this.service);
  }

  deleteEntry() {
    this.cuentasCobrarProvider.removeEntry(this.accountReceivableToDelete);
  }

  updatePay(accountReceivable) {
    if (accountReceivable.paymentMade) {
      let payDate = new Date();
      accountReceivable['payDate'] = payDate;
    } else {
      accountReceivable['payDate'] = null;
    }
    this.cuentasCobrarProvider.updateAccountReceivable(accountReceivable);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasCobrarPage');
  }

}
