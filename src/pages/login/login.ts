import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CuentasCobrarPage } from '../cuentas-cobrar/cuentas-cobrar';
import { CommonsProvider } from '../../providers/commons';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    @ViewChild('email') email;
    @ViewChild('password') password;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController,
              public navParams: NavParams, private commons: CommonsProvider, private menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(false);
    console.log('ionViewDidLoad LoginPage');
  }


  signInUser(){

    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data =>{
      this.navCtrl.setRoot(CuentasCobrarPage);
    })
    .catch(error =>{
      if (error.code === 'auth/invalid-email') {
        this.commons.createAlert('Hubo un problema', 'El formato de correo no es correcto');
      } else {
        this.commons.createAlert('Hubo un problema', 'Usuario o contraseña invalida');
      }
    });
  }

}
