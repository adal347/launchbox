import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalTenantPage } from './modal-tenant';

@NgModule({
  declarations: [
    ModalTenantPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalTenantPage),
  ],
})
export class ModalTenantPageModule {}
