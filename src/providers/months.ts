import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class MonthsProvider {

	monthsRef: AngularFireList<any>;
	monthsObservable: Observable<any[]>;
	months: any;

	constructor(public db: AngularFireDatabase) {
		this.monthsRef = this.db.list('months');
		this.monthsObservable = this.getMonths();
		this.monthsObservable.forEach((arrayMonths) => {
			this.months = arrayMonths;
		});

	}

	public createMonth(month) {
		let self = this;
		let promise = new Promise((resolve, reject) => {
			self.activateMonth().then(() => {
				month.isActive = true;
				self.monthsRef.push(month);
			});
			resolve();
		});
		return promise;
	}

	public updateMonth(month) {
	    let self = this;
	    let promise = new Promise((resolve, reject) => {
	      self.monthsRef.update(month.key, month);
	      resolve();
	    });
	    return promise;
	}

	public getMonths() {
		return this.monthsRef.snapshotChanges().map( data => {
			return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
		});
	}

	public activateMonth() {
		let promise = new Promise((resolve, reject) => {
			this.months.forEach((month) => {
				if (month.isActive) {
					month.isActive = false;
					this.updateMonth(month);
				}
			});
			resolve();
		});
		return promise;
	}

	public removeMonth(month) {
	    let self = this;
	    let promise = new Promise((resolve, reject) => {
		  self.monthsRef.remove(month.key);
	      resolve();
	    });
	    return promise;
	}
}
