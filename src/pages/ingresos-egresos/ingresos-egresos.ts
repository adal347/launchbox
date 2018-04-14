import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { IngresosEgresosProvider} from '../../providers/ingresos_egresos';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@IonicPage()
@Component({
  selector: 'page-ingresos-egresos',
  templateUrl: 'ingresos-egresos.html',
})
export class IngresosEgresosPage {

  month: any;
  title: any;
  entry: any
  income: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ingresosEgresosProvider: IngresosEgresosProvider,
              public modalCtrl: ModalController) {
    this.month = 'Marzo';
    this.income = this.ingresosEgresosProvider.getIncome();

    // this.totalIncome();
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
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresosEgresosPage');
  }

}
