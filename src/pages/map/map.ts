import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  boxes: object[] = [];
  items: Observable<any[]>;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.items = this.db.list('boxes').valueChanges().subscribe( data => {
      this.boxes = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
