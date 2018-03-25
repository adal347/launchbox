import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/*
  Generated class for the IngresosEgresosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IngresosEgresosProvider {
	accountsReceivableRef: AngularFireList<any>;
	billsRef: AngularFireList<any>;
	boxesRef: AngularFireList<any>;
	boxesStatusRef: AngularFireList<any>;
	typeBoxRef: AngularFireList<any>;

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
  	public getBoxes() {
		return this.boxesRef.snapshotChanges().map( data => {
			return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
		});
	}

	public getBoxStatus() {
		return this.boxesStatusRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
	}

	public getTypeBox() {
		return this.typeBoxRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
	}

  	public removeEntry(accountReceivable) {
		this.accountsReceivableRef.remove(accountReceivable.key);
	}

}
