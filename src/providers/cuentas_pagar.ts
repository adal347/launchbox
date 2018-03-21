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
			toPay: service.toPay || 0,
			limitDate: service.limitDate || null
		};
		this.billsRef.push(bill);
  }

	public updateBill(bill) {
		this.billsRef.update(bill.key, bill);
	}

	public getBills() {
		return this.billsRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
	}

	public removeBill(bill) {
		this.billsRef.remove(bill.key);
	}
}
