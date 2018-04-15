import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCuentasPagarPage } from './modal-cuentas-pagar';

@NgModule({
  declarations: [
    ModalCuentasPagarPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCuentasPagarPage),
  ],
})
export class ModalCuentasPagarPageModule {}
