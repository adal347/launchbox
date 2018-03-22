import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
/**
 * Generated class for the IngresosEgresosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingresos-egresos',
  templateUrl: 'ingresos-egresos.html',
})
export class IngresosEgresosPage {

  s;
  boxes: object[]=[];
  statusBoxes: object[]=[];
  typoBoxes: object[]=[];

  constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  	this.s = this.db.list('boxes').valueChanges().subscribe( data => {
		this.boxes=data;
	});
	this.s= this.db.list('statusBox').valueChanges().subscribe(data => {
		this.statusBoxes=data;
	});
	this.s= this.db.list('typoBox').valueChanges().subscribe(data => {
		this.typoBoxes=data;
	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresosEgresosPage');
  }

}
