import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the CondensadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-condensado',
  templateUrl: 'condensado.html',
})
export class CondensadoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public documentViewer: DocumentViewer) {
  }
 	 downloadPDF(argument) {
 		// body...
 		let options = {
		 title: 'hi'
		};
		this.documentViewer.viewDocument('myPDF.PDF', 'aplication/pdf', options)
 	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad CondensadoPage');
  }

}
