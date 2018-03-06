import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuentasPagarPage } from './cuentas-pagar';

@NgModule({
  declarations: [
    CuentasPagarPage,
  ],
  imports: [
    IonicPageModule.forChild(CuentasPagarPage),
  ],
})
export class CuentasPagarPageModule {}
