import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
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

	s;
  boxes: object[]=[];
  statusBoxes: object[]=[];
  typoBoxes: object[]=[];
  typoPago: object[]=[];
  title: any;
  show: any;

  constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  	this.title= 'Ingreso de nuevo servicio';
  	this.s= this.db.list('typoPago').valueChanges().subscribe(data => {
		this.typoPago=data;
	});
  }

  initModal(type){
  	this.show = false;
  	if (type==1) {
  		this.title= 'Ingreso de nuevo servicio';
  	}
  	else if (type==0) {
  		this.title = 'Editar servicio';
  	}
  	else{
  		this.title = 'Ver detalles del servicio';
  		this.show=true;
  	}
  	$('#newEntryModal').modal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasPagarPage');
  }

}
