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
			this.expensesRef = this.db.list('expesnses');
		}

	  public getIncome() {
	    return this.incomeRef.snapshotChanges().map( data => {
	      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
	    });

	  }

	  public getExpenses() {
	    return this.expensesRef.snapshotChanges().map( data => {
	      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
	    });

	  }

		public createEntry(entry) {
	    let self = this;
	    let promise = new Promise((resolve, reject) => {
	      self.incomeRef.push(entry);
	      resolve();
	    });
	    return promise;
		}

		public createEgress(egress) {
	    let self = this;
	    let promise = new Promise((resolve, reject) => {
	      self.expensesRef.push(egress);
	      resolve();
	    });
	    return promise;
		}

		public updateEntry(entry) {
	    let self = this;
	    let promise = new Promise((resolve, reject) => {
	      self.incomeRef.update(entry.key, entry);
	      resolve();
	    });
	    return promise;
		}

		public updateEgress(egress) {
	    let self = this;
	    let promise = new Promise((resolve, reject) => {
	      self.expensesRef.update(egress.key, egress);
	      resolve();
	    });
	    return promise;
		}

		public removeIncome(entry) {
	    let self = this;
	    let promise = new Promise((resolve, reject) => {
	      self.incomeRef.remove(entry.key);
	      resolve();
	    });
	    return promise;
		}

}
