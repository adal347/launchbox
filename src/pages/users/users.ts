import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CommonsProvider } from '../../providers/commons';
import { UsersProvider } from '../../providers/users';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  user: any;
  title: any;
  permissions: Observable<any[]>;
  users: Observable<any[]>;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController,
              public navParams: NavParams, private commons: CommonsProvider,
              private usersProvider: UsersProvider) {
    this.user = {};
  	this.permissions = this.usersProvider.getPermissions();
  	this.users = this.usersProvider.getUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
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

  initModal(type, user) {
  	if (type == 1) {
      this.user = {};
  		this.title = 'Registrar nuevo usuario';

  	} else if (type == 0) {
      this.user = user;
  		this.title = 'Actualizar usuario';
  	}
  }

}
