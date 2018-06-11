import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalMonthPage } from './modal-month';

@NgModule({
  declarations: [
    ModalMonthPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalMonthPage),
  ],
})
export class ModalMonthPageModule {}
