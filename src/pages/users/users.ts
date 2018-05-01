import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
  userToDelete: any;
  title: any;
  disabled: any;
  users: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, private commons: CommonsProvider,
              private usersProvider: UsersProvider, public modalCtrl : ModalController) {
    this.user = {};
  	this.users = this.usersProvider.getUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  initModal(type, user) {
  	if (type == 1) {
      this.user = {};
  		this.title = 'Registrar nuevo usuario';
      this.disabled = false;

  	} else if (type == 0) {
      this.user = user;
  		this.title = 'Actualizar usuario';
      this.disabled = true;
  	}
    let modalPage = this.modalCtrl.create('ModalPage', { title: this.title, user: this.user, disabled: this.disabled });
    modalPage.present();
  }

  deleteUser() {
    this.usersProvider.removeUser(this.userToDelete).then(() => {
      this.commons.createAlert('Eliminación Exitosa', 'El usuario se eliminó correctamente');
    })
    .catch(error => {
      this.commons.createAlert('Algo salió mal', 'Hubo un problema al eliminar al usuario');
    });
  }

}
