import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CommonsProvider } from '../../providers/commons';
import { UsersProvider } from '../../providers/users';
import { Observable } from 'rxjs/Observable';

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

  user: any;
  permissions: Observable<any[]>;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController,
              public navParams: NavParams, private commons: CommonsProvider,
              private usersProvider: UsersProvider) {
    this.user = {};
  	this.permissions = this.usersProvider.getPermissions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(){
    this.usersProvider.createUser(this.user);
    this.fire.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(data =>{
      this.commons.createAlert('Registro Exitoso', 'Registraste a ' + this.user.email);
    })
    .catch(error =>{
      if (error.code === 'auth/invalid-email') {
        this.commons.createAlert('Hubo un problema', 'El formato de correo no es correcto');
      } else {
        this.commons.createAlert('Hubo un problema', 'La contraseña debe contener mínimo 3 caracteres');
      }
    });
  }

}
