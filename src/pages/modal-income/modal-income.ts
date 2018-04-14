import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonsProvider } from '../../providers/commons';
import { IngresosEgresosProvider} from '../../providers/ingresos_egresos';
import { CuentasCobrarProvider } from '../../providers/cuentas_cobrar';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ModalIncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-income',
  templateUrl: 'modal-income.html',
})
export class ModalIncomePage {
  title: any;
  income: any;
  boxes: Observable<any[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ingresosEgresosProvider: IngresosEgresosProvider,
              public viewCtrl: ViewController, private commons: CommonsProvider,
              public cuentasCobrarProvider: CuentasCobrarProvider) {
    this.boxes = this.cuentasCobrarProvider.getBoxes();
    this.title = this.navParams.get('title');
    this.income = this.navParams.get('income');
  }

  submitIncome() {
    if (this.title === 'Actualizar Ingreso') {
      this.updateIncome();
    } else {
      this.registerIncome();
    }
  }

  registerIncome() {
    this.ingresosEgresosProvider.createIncome(this.income).then(() => {
      this.commons.createAlert('Registro Exitoso', 'El ingreso se registro correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al registrar el ingreso');
    });
  }

  // updateIncome() {
  //   this.ingresosEgresosProvider.updateIncome(this.income).then(() => {
  //     this.commons.createAlert('Actualización Exitosa', 'El ingreso se actualizo correctamente');
  //     this.dismiss();
  //   })
  //   .catch(error => {
  //     this.commons.createAlert('Algo salió mal', 'Hubo un problema al actualizar el ingreso');
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalIncomePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
