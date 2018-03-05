import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedinPage } from '../loggedin/loggedin';


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

    @ViewChild('username') username;
    @ViewChild('password') password;

  constructor(/*private alertCtrl: AlertController,*/ private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
/*
  alert(message: string){
    this.alertCtrl.create({

      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    
    }).present();

  }
*/
  signInUser(){
    //promise with loggin info 
    this.fire.auth.signInWithEmailAndPassword(this.username.value, this.password.value)

    .then(data =>{
        console.log('got some data: ', this.fire.auth.currentUser);
        //this.alert('Success, you are logged in');
        this.navCtrl.setRoot(LoggedinPage)
    })
    .catch(error =>{
        console.log('got an error: ', error);
        //this.alert(error.message)
    });

    //Shows username and password on the browser's console
    console.log("Would login as: ", this.username.value, this.password.value);

  }

}
