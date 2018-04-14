import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/*
  Generated class for the IngresosEgresosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IngresosEgresosProvider {
		incomeRef: AngularFireList<any>;

  	constructor(public db: AngularFireDatabase) {
			this.incomeRef = this.db.list('income');
		}

		public createIncome(income) {
	    let self = this;
	    let promise = new Promise((resolve, reject) => {
	      self.incomeRef.push(income);
	      resolve();
	    });
	    return promise;
		}

}
