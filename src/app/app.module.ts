import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CuentasCobrarPage } from '../pages/cuentas-cobrar/cuentas-cobrar';
import { CuentasPagarPage } from '../pages/cuentas-pagar/cuentas-pagar';
import { MapPage } from '../pages/map/map';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Environment } from '../enviorments/enviorment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { CuentasCobrarProvider } from '../providers/cuentas_cobrar';
import { CommonsProvider } from '../providers/commons';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CuentasCobrarPage,
    CuentasPagarPage,
    MapPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(Environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CuentasCobrarPage,
    CuentasPagarPage,
    MapPage,
    RegisterPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CuentasCobrarProvider,
    CommonsProvider
  ]
})
export class AppModule {}
