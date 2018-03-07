import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { CuentasCobrarService } from '../../services/cuentas_cobrar.service';

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

  boxesRef: AngularFireList<any>;
  boxes: Observable<any[]>
  statusBoxes: object[]=[];
  typoBoxes: object[]=[];
  typoPago:object[]=[];
  service: any;
  s;

  constructor(public db:AngularFireDatabase, public navCtrl: NavController,
              public navParams: NavParams, public cuentasCobrarService: CuentasCobrarService) {
    this.boxesRef = this.db.list('boxes');
    this.boxes = this.boxesRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
	});
  	this.s= this.db.list('statusBox').valueChanges().subscribe(data => {
  		this.statusBoxes=data;
  	});
  	this.s= this.db.list('typoBox').valueChanges().subscribe(data => {
  		this.typoBoxes=data;
  	});
  	this.s= this.db.list('typoPago').valueChanges().subscribe(data => {
  		console.log(data);
		this.typoPago=data;
	});
	this.service={};

  }

  createNewEntry() {
  	console.log(this.service.box);
  	//this.boxesRef.update();
    this.cuentasCobrarService.createNewEntry(this.service);
    console.log(this.boxes);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasCobrarPage');
  }

}
