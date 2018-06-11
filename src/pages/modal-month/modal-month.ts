import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonsProvider } from '../../providers/commons';
import { MonthsProvider } from '../../providers/months';

/**
 * Generated class for the ModalTenantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-month',
  templateUrl: 'modal-month.html',
})
export class ModalMonthPage {
  title: any;
  month: any;
  months: any;
  years: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private monthsProvider: MonthsProvider, public viewCtrl: ViewController,
              private commons: CommonsProvider) {
    this.title = this.navParams.get('title');
    this.month = this.navParams.get('month');
    this.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];
  }

  submitMonth() {
    if (this.title === 'Actualizar mes') {
      this.updateMonth();
    } else {
      this.registerMonth();
    }
  }

  registerMonth() {
    this.monthsProvider.createMonth(this.month).then(() => {
      this.commons.createAlert('Registro Exitoso', 'El mes se registro correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al registrar el mes');
    });
  }

  updateMonth() {
    this.monthsProvider.updateMonth(this.month).then(() => {
      this.commons.createAlert('Actualización Exitosa', 'El mes se actualizo correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al actualizar el mes');
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalTenantPage');
  }

}
