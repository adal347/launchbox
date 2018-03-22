import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngresosEgresosPage } from './ingresos-egresos';

@NgModule({
  declarations: [
    IngresosEgresosPage,
  ],
  imports: [
    IonicPageModule.forChild(IngresosEgresosPage),
  ],
})
export class IngresosEgresosPageModule {}
