import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonsProvider } from '../../providers/commons';
import { MonthsProvider } from '../../providers/months';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the MonthsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-months',
  templateUrl: 'months.html',
})
export class MonthsPage {

    monthsObservable: Observable<any[]>;
    title: any;
    month: any;
    monthToDelete: any;
    months: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public monthsProvider: MonthsProvider, private commons: CommonsProvider,
              public modalCtrl : ModalController) {
    this.monthsObservable = this.monthsProvider.getMonths();
    this.monthsObservable.forEach((arrayMonths) => {
        this.months = arrayMonths;
    });
  }

  initModal(type, month) {
  	if (type == 1) {
      this.month = {};
  	   this.title = 'Registrar nuevo mes';
  	} else if (type == 0) {
      this.month = month;
  		this.title = 'Actualizar mes';
  	}
    let modalPage = this.modalCtrl.create('ModalMonthPage', { title: this.title, month: this.month });
    modalPage.present();
  }

  updateMonth(month) {
      this.monthsProvider.activateMonth().then(() => {
          this.monthsProvider.updateMonth(month).then(() => {
              this.commons.createAlert('Actualización Exitosa', 'El mes se actualizo correctamente');
          })
          .catch(error => {
              this.commons.createAlert('Algo salió mal', 'Hubo un problema al actualizar el mes');
          });
      })
      .catch(error => {
          this.commons.createAlert('Algo salió mal', 'Hubo un problema al actualizar el mes');
      })
  }

  deleteMonth() {
    this.monthsProvider.removeMonth(this.monthToDelete).then(() => {
      this.commons.createAlert('Eliminación Exitosa', 'El mes se eliminó correctamente');
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al eliminar el mes');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MonthsPage');
  }

}
