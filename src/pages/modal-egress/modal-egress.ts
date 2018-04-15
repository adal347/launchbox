import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IngresosEgresosProvider} from '../../providers/ingresos_egresos';
import { CommonsProvider } from '../../providers/commons';

@IonicPage()
@Component({
  selector: 'page-modal-egress',
  templateUrl: 'modal-egress.html',
})
export class ModalEgressPage {
  title: any;
  egress: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, private commons: CommonsProvider,
              public ingresosEgresosProvider: IngresosEgresosProvider) {
    this.title = this.navParams.get('title');
    this.egress = this.navParams.get('egress');
  }

  submitEgress() {
    if (this.title === 'Actualizar Egreso') {
      this.updateEgress();
    } else {
      this.registerEgress();
    }
  }

  registerEgress() {
    this.ingresosEgresosProvider.createEgress(this.egress).then(() => {
      this.commons.createAlert('Registro Exitoso', 'El egreso se registro correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al registrar el egreso');
    });
  }

  updateEgress() {
    this.ingresosEgresosProvider.updateEgress(this.egress).then(() => {
      this.commons.createAlert('Actualización Exitosa', 'El egreso se actualizo correctamente');
      this.dismiss();
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al actualizar el egreso');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalEgressPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
