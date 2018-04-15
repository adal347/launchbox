import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users';
import { CommonsProvider } from '../../providers/commons';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
    title: any;
    disabled: any;
    user: any;
    permissions: Observable<any[]>;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public navParams: NavParams, private fire: AngularFireAuth,
              private usersProvider: UsersProvider, private commons: CommonsProvider) {
      this.permissions = this.usersProvider.getPermissions();
      this.title = this.navParams.get('title');
      this.user = this.navParams.get('user');
      this.disabled = this.navParams.get('disabled');
  }

  submitUser() {
    if (this.title === 'Actualizar usuario') {
      this.updateUser();
    } else {
      this.registerUser();
    }
  }

  registerUser() {
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

  updateUser() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
