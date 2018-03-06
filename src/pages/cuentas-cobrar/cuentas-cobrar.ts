import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
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

  s;
  boxes: object[]=[];
  statusBoxes: object[]=[];
  typoBoxes: object[]=[];

  constructor(public db:AngularFireDatabase, public navCtrl: NavController,
              public navParams: NavParams, public cuentasCobrarService: CuentasCobrarService) {
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

  createNewEntry() {
    this.cuentasCobrarService.createNewEntry();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasCobrarPage');
  }

}
