import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { CuentasCobrarPage } from '../pages/cuentas-cobrar/cuentas-cobrar';
import { CuentasPagarPage } from '../pages/cuentas-pagar/cuentas-pagar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Environment } from '../enviorments/enviorment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { CuentasCobrarService } from '../services/cuentas_cobrar.service';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    CuentasCobrarPage,
    CuentasPagarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(Environment.firebase),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    CuentasCobrarPage,
    CuentasPagarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CuentasCobrarService
  ]
})
export class AppModule {}
