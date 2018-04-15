import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class CuentasPagarProvider {

	accountsReceivableRef: AngularFireList<any>;
	billsRef: AngularFireList<any>;

	constructor(public db: AngularFireDatabase) {
		this.billsRef = this.db.list('bills');
	}

  public createNewEntry(service) {
		let bill = {
			service: service.service,
			provider: service.provider,
			typePay: service.typePay,
			amount: service.amount || 0,
			paid: service.paid || 0,
			toPay: service.amount-service.paid || 0,
			limitDate: service.limitDate || null
		};
		let self = this;
		let promise = new Promise((resolve, reject) => {
	      self.billsRef.push(bill);
	      resolve();
	    });
	    return promise;
  }

	public updateBill(bill) {
		let self = this;
		let promise = new Promise((resolve, reject) => {
	      self.billsRef.update(bill.key, bill);
	      resolve();
	    });
	    return promise;
	}

	public getBills() {
		return this.billsRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
	}

	public removeBill(bill) {
		let self = this;
		let promise = new Promise((resolve, reject) => {
	      self.billsRef.remove(bill.key);
	      resolve();
	    });
	    return promise;
	}
}
