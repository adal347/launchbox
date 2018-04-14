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
  incomeTotal: number = 0;
  entryToDelete: any;
  income: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ingresosEgresosProvider: IngresosEgresosProvider,
              public modalCtrl: ModalController, private commons: CommonsProvider) {
    this.month = 'Marzo';
    this.income = this.ingresosEgresosProvider.getIncome();

    this.totalIncome();
    // this.totalExpenses();
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
    this.totalIncome();
  }

  deleteEntry() {
    this.ingresosEgresosProvider.removeIncome(this.entryToDelete).then(() => {
      this.commons.createAlert('Eliminación Exitosa', 'El ingreso se eliminó correctamente');
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al eliminar el ingreso');
    });
  }

  totalIncome() {
    this.incomeTotal = 0;
    this.income.forEach((arrayIncome) => {
      arrayIncome.forEach((entry) => {
        if (entry.total) {
         this.incomeTotal += Number(entry.total);
        }
      });
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresosEgresosPage');
  }

}
