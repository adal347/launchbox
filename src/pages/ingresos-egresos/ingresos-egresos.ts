import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IngresosEgresosProvider} from '../../providers/ingresos_egresos';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@IonicPage()
@Component({
  selector: 'page-ingresos-egresos',
  templateUrl: 'ingresos-egresos.html',
})
export class IngresosEgresosPage {

  s;
  accountsReceivable: Observable<any[]>;
  boxes: object[]=[];
  statusBoxes: object[]=[];
  typoBoxes: object[]=[];
  show: any;
  service: any;
  title: any;
  month: any;
  amount: number = 0;


  constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public ingresosEgresosProvider: IngresosEgresosProvider) {
  	this.s = this.db.list('boxes').valueChanges().subscribe( data => {
		this.boxes=data;
	});
	this.s= this.db.list('statusBox').valueChanges().subscribe(data => {
		this.statusBoxes=data;
	});
	this.s= this.db.list('typoBox').valueChanges().subscribe(data => {
		this.typoBoxes=data;
	});
  this.month = 'Marzo';

  this.totalAmount();
  }

  createNewEntry() {
    this.ingresosEgresosProvider.createNewEntry(this.service);
  }

  deleteEntry() {
    this.ingresosEgresosProvider.removeEntry(this.accountsReceivable);
  }
  totalAmount(){

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


  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresosEgresosPage');
  }

}
