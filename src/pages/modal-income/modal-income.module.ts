import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalIncomePage } from './modal-income';

@NgModule({
  declarations: [
    ModalIncomePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalIncomePage),
  ],
})
export class ModalIncomePageModule {}
