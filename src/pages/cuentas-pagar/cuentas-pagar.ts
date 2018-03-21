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
  amountTotal: number = 0;
  month: any;
  paidTotal: number = 0;
  toPaidTotal: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cuentasCobrarProvider: CuentasCobrarProvider,
              public cuentasPagarProvider: CuentasPagarProvider) {
    this.typePay = this.cuentasCobrarProvider.getTypePay();
    this.bills = this.cuentasPagarProvider.getBills();
  	this.title= 'Ingreso de nuevo servicio';
    this.service = {};
    this.billToDelete = {};
    this.totalAmount();
    this.totalPaid();
    this.totalToPaid();
    this.month = 'Marzo';
  }

  initModal(type, bill) {
  	this.show = false;
    console.log(this.service);
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
      arrayBills.forEach((bill) => {
        this.amountTotal += Number(bill.amount);
      });
    });
  }

  totalPaid() {
    this.bills.forEach((arrayBills) => {
      arrayBills.forEach((bill) => {
        if (bill.paid) {
         this.paidTotal += Number(bill.paid);
        }
      });
    });
  }

  totalToPaid() {
    this.bills.forEach((arrayBills) => {
      arrayBills.forEach((bill) => {
        if (bill.toPay) {
         this.toPaidTotal += Number(bill.toPay);  
        }
      });
    });
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
  }

  updateEntry() {
    this.cuentasPagarProvider.updateBill(this.service);
  }

  deleteEntry() {
    this.cuentasPagarProvider.removeBill(this.billToDelete);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasPagarPage');
  }

}
