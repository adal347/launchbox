import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LoggedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {
    email:string;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.email = fire.auth.currentUser.email;
  }


  logout(){
    this.fire.auth.signOut()
    .then(data =>{
        //log info
        console.log('User has logged out: ', this.fire.auth.currentUser);
        //redirect to login page
        this.navCtrl.setRoot(LoginPage)
    })
    .catch(error =>{
        //log error info
        console.log('got an error: ', error);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
  }

}
