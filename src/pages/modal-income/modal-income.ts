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
  entry: any;
  boxes: Observable<any[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ingresosEgresosProvider: IngresosEgresosProvider,
              public viewCtrl: ViewController, private commons: CommonsProvider,
              public cuentasCobrarProvider: CuentasCobrarProvider) {
    this.boxes = this.cuentasCobrarProvider.getBoxes();
    this.typePay = this.cuentasCobrarProvider.getTypePay();
    this.title = this.navParams.get('title');
    this.entry = this.navParams.get('entry');
  }

  submitEntry() {
    if (this.title === 'Actualizar Ingreso') {
      this.updateEntry();
    } else {
      this.registerEntry();
    }
  }

  registerEntry() {
    this.ingresosEgresosProvider.createEntry(this.entry).then(() => {
      this.commons.createAlert('Registro Exitoso', 'El ingreso se registro correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al registrar el ingreso');
    });
  }

  updateEntry() {
    this.ingresosEgresosProvider.updateEntry(this.entry).then(() => {
      this.commons.createAlert('Actualización Exitosa', 'El ingreso se actualizo correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al actualizar el ingreso');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalIncomePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
