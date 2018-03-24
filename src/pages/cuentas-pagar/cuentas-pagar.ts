import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CuentasCobrarProvider } from '../../providers/cuentas_cobrar';
import { CuentasPagarProvider } from '../../providers/cuentas_pagar';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the CuentasPagarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuentas-pagar',
  templateUrl: 'cuentas-pagar.html',
})
export class CuentasPagarPage {

  typePay: Observable<any[]>;
  bills: Observable<any[]>;
  title: any;
  show: any;
  service: any;
  billToDelete: any;
  month: any;
  amountTotal: number;
  paidTotal: number;
  toPaidTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cuentasCobrarProvider: CuentasCobrarProvider,
              public cuentasPagarProvider: CuentasPagarProvider) {
    this.typePay = this.cuentasCobrarProvider.getTypePay();
    this.bills = this.cuentasPagarProvider.getBills();
  	this.title= 'Ingreso de nuevo servicio';
    this.service = {};
    this.billToDelete = {};
    this.updateTotals();
    this.month = 'Marzo';
  }

  initModal(type, bill) {
  	this.show = false;
  	if (type == 1) {
      this.service = {};
  		this.title = 'Ingreso de nuevo servicio';

  	} else if (type == 0) {
      this.service = bill;
  		this.title = 'Editar servicio';
  	}
  }

  totalAmount() {
    this.bills.forEach((arrayBills) => {
      this.amountTotal = 0;
      arrayBills.forEach((bill) => {
        this.amountTotal += Number(bill.amount);
      });
    });
  }

  totalPaid() {
    this.bills.forEach((arrayBills) => {
      this.paidTotal = 0;
      arrayBills.forEach((bill) => {
        if (bill.paid) {
         this.paidTotal += Number(bill.paid);
        }
      });
    });
  }

  totalToPaid() {
    this.bills.forEach((arrayBills) => {
      this.toPaidTotal = 0;
      arrayBills.forEach((bill) => {
        if (bill.toPay) {
         this.toPaidTotal += Number(bill.toPay);
        }
      });
    });
  }

  updateTotals() {
    this.totalAmount();
    this.totalPaid();
    this.totalToPaid();
  }

  submitService() {
    if (this.title === 'Editar servicio') {
      this.updateEntry();
    } else {
      this.createNewEntry();
    }
  }

  createNewEntry() {
    this.cuentasPagarProvider.createNewEntry(this.service);
    this.updateTotals();
  }

  updateEntry() {
    this.cuentasPagarProvider.updateBill(this.service);
    this.updateTotals();
  }

  deleteEntry() {
    this.cuentasPagarProvider.removeBill(this.billToDelete);
    this.updateTotals();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasPagarPage');
  }

}
