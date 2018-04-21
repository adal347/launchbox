import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAccountsPage } from './modal-accounts';

@NgModule({
  declarations: [
    ModalAccountsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAccountsPage),
  ],
})
export class ModalAccountsPageModule {}
