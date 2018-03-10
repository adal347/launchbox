import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { MapPage } from '../pages/map/map';
import { CuentasCobrarPage } from '../pages/cuentas-cobrar/cuentas-cobrar';
import { CuentasPagarPage } from '../pages/cuentas-pagar/cuentas-pagar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Environment } from '../enviorments/enviorment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { CuentasCobrarProvider } from '../providers/cuentas_cobrar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    CuentasCobrarPage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    CuentasPagarPage
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
    HomePage,
    MapPage,
    CuentasCobrarPage,
    CuentasPagarPage,
    LoginPage,
    RegisterPage,
    LoggedinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CuentasCobrarProvider
  ]
})
export class AppModule {}
