import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { CuentasCobrarPage } from '../pages/cuentas-cobrar/cuentas-cobrar';
import { CuentasPagarPage } from '../pages/cuentas-pagar/cuentas-pagar';
import { MapPage } from '../pages/map/map';
import { IngresosEgresosPage } from '../pages/ingresos-egresos/ingresos-egresos';
import { CondensadoPage } from '../pages/condensado/condensado';
import { UsersPage } from '../pages/users/users';
import { TenantsPage } from '../pages/tenants/tenants';
import { MonthsPage } from '../pages/months/months';

import { AngularFireAuth } from 'angularfire2/auth';
import { CommonsProvider } from '../providers/commons';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, private fire: AngularFireAuth,
              private commons: CommonsProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Cuentas por cobrar', component: CuentasCobrarPage },
      { title: 'Cuentas por pagar', component: CuentasPagarPage },
      { title: 'Mapa', component: MapPage },
      { title: 'Ingresos/Egresos', component: IngresosEgresosPage },
      { title: 'Condensado del mes', component: CondensadoPage },
      { title: 'Usuarios', component: UsersPage },
      { title: 'Inquilinos', component: TenantsPage },
      { title: 'Meses', component: MonthsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  logout(){
    this.fire.auth.signOut().then(data => {
        this.nav.setRoot(LoginPage)
    })
    .catch(error =>{
      this.commons.createAlert('Hubo un problema', 'Cierre de sesion no exitoso');
    });
  }

}
