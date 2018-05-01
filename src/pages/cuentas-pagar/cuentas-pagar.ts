import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CuentasCobrarProvider } from '../../providers/cuentas_cobrar';
import { CuentasPagarProvider } from '../../providers/cuentas_pagar';
import { CommonsProvider } from '../../providers/commons';
import { Observable } from 'rxjs/Observable';

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
              public cuentasPagarProvider: CuentasPagarProvider, public modalCtrl : ModalController, private commons: CommonsProvider) {
    this.typePay = this.cuentasCobrarProvider.getTypePay();
    this.bills = this.cuentasPagarProvider.getBills();
  	this.title= 'Ingreso de nuevo servicio';
    this.service = {};
    this.billToDelete = {};
    this.updateTotals();
    this.month = 'Mayo';
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
    let modalPage = this.modalCtrl.create('ModalCuentasPagarPage', { title: this.title, service: this.service });
    modalPage.present();
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

  deleteEntry() {
    this.cuentasPagarProvider.removeBill(this.billToDelete).then(() => {
      this.commons.createAlert('Eliminación Exitosa', 'El servicio se eliminó correctamente');
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al eliminar el servicio');
    });
    this.updateTotals();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasPagarPage');
  }

}
