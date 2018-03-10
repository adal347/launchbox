import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    @ViewChild('email') email;
    @ViewChild('password') password;


  constructor(private fire: AngularFireAuth, public navCtrl: NavController,
              public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  registerUser(){
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data =>{
      this.createAlert('Registro Exitoso', 'Registraste a ' + this.email.value);
    })
    .catch(error =>{
      if (error.code === 'auth/invalid-email') {
        this.createAlert('Hubo un problema', 'El formato de correo no es correcto');
      } else {
        this.createAlert('Hubo un problema', 'La contraseña debe contener mínimo 3 caracteres');
      }
    });
  }

}
