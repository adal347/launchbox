import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { IngresosEgresosProvider} from '../../providers/ingresos_egresos';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CommonsProvider } from '../../providers/commons';
import { Observable } from 'rxjs/Observable';
@IonicPage()
@Component({
  selector: 'page-ingresos-egresos',
  templateUrl: 'ingresos-egresos.html',
})
export class IngresosEgresosPage {

  month: any;
  title: any;
  entry: any;
  egress: any;
  incomeTotal: number = 0;
  expensesTotal: number = 0;
  entryToDelete: any;
  egressToDelete: any;
  income: Observable<any[]>;
  expenses: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ingresosEgresosProvider: IngresosEgresosProvider,
              public modalCtrl: ModalController, private commons: CommonsProvider) {
    this.month = 'Marzo';
    this.income = this.ingresosEgresosProvider.getIncome();
    this.expenses = this.ingresosEgresosProvider.getExpenses();

    this.totalIncome();
    this.totalExpenses();
  }

  initModalIncome(type, entry) {
    if (type == 1) {
      this.entry = {};
      this.title = 'Nuevo Ingreso';

    } else if (type == 0) {
      this.entry = entry;
      this.title = 'Actualizar Ingreso';
    }
    let modalPage = this.modalCtrl.create('ModalIncomePage', { title: this.title, entry: this.entry });
    modalPage.present();
  }

  initModalExpenses(type, egress) {
    if (type == 1) {
      this.egress = {};
      this.title = 'Nuevo Egreso';

    } else if (type == 0) {
      this.egress = egress;
      this.title = 'Actualizar Egreso';
    }
    let modalPage = this.modalCtrl.create('ModalEgressPage', { title: this.title, egress: this.egress });
    modalPage.present();
  }

  deleteEntry() {
    this.ingresosEgresosProvider.removeIncome(this.entryToDelete).then(() => {
      this.commons.createAlert('Eliminación Exitosa', 'El ingreso se eliminó correctamente');
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al eliminar el ingreso');
    });
  }

  deleteEgress() {
    this.ingresosEgresosProvider.removeEgress(this.egressToDelete).then(() => {
      this.commons.createAlert('Eliminación Exitosa', 'El ingreso se eliminó correctamente');
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al eliminar el ingreso');
    });
  }

  totalIncome() {
    this.income.forEach((arrayIncome) => {
      this.incomeTotal = 0;
      arrayIncome.forEach((entry) => {
        if (entry.total) {
         this.incomeTotal += Number(entry.total);
        }
      });
    });
  }

  totalExpenses() {
    this.expenses.forEach((arrayExpenses) => {
      this.expensesTotal = 0;
      arrayExpenses.forEach((egress) => {
        if (egress.amount) {
         this.expensesTotal += Number(egress.amount);
        }
      });
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresosEgresosPage');
  }

}
