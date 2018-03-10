import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuentasCobrarPage } from './cuentas-cobrar';

@NgModule({
  declarations: [
    CuentasCobrarPage,
  ],
  imports: [
    IonicPageModule.forChild(CuentasCobrarPage),
  ],
})
export class CuentasCobrarPageModule {}
