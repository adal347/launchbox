import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

    @ViewChild('username') username;
    @ViewChild('password') password;


  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(){
    //send user info for creation
    this.fire.auth.createUserWithEmailAndPassword(this.username.value, this.password.value)
    
    .then(data =>{
        //log success info
        console.log('got data: ', data);
    })
    .catch(error =>{
        //log error info
        console.log('got an error: ', error);
    });

    console.log("Would register user as: ", this.username.value, this.password.value);

  }

}
