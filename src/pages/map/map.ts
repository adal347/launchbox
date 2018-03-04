import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  section1: object[] = [];
  section2: object[] = [];
  section3: object[] = [];
  section4: object[] = [];
  section5: object[] = [];
  section6: object[] = [];
  section7: object[] = [];
  section8: object[] = [];
  section9: object[] = [];
  section10: object[] = [];
  s;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.s = this.db.list('boxes').valueChanges().subscribe( data => {
      for (let i = 35; i < data.length; i++) {
        this.section1.push(data[i]);
      }
      for (let i = 31; i < 35; i++) {
        this.section2.push(data[i]);
      }
      for (let i = 27; i < 31; i++) {
        this.section3.push(data[i]);
      }
      for (let i = 23; i < 27; i++) {
        this.section4.push(data[i]);
      }
      for (let i = 19; i < 23; i++) {
        this.section5.push(data[i]);
      }
      for (let i = 16; i < 19; i++) {
        this.section6.push(data[i]);
      }
      for (let i = 13; i < 16; i++) {
        this.section7.push(data[i]);
      }
      for (let i = 8; i < 13; i++) {
        this.section8.push(data[i]);
      }
      for (let i = 4; i < 8; i++) {
        this.section9.push(data[i]);
      }
      for (let i = 0; i < 4; i++) {
        this.section10.push(data[i]);
      }
    });
  }

  ionViewDidLoad() {
  }

}
