import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class CuentasCobrarProvider {

	boxesRef: AngularFireList<any>;
	boxesStatusRef: AngularFireList<any>;
	typeBoxRef: AngularFireList<any>;
	typePayRef: AngularFireList<any>;
	tenantsRef: AngularFireList<any>;
	accountsReceivableRef: AngularFireList<any>;

	constructor(public db: AngularFireDatabase) {
		this.boxesRef = this.db.list('boxes');
		this.boxesStatusRef = this.db.list('statusBox');
		this.typeBoxRef = this.db.list('typeBox');
		this.typePayRef = this.db.list('typePay');
		this.tenantsRef = this.db.list('tenants');
		this.accountsReceivableRef = this.db.list('accountsReceivable');
	}

  public createService(service) {
  	let box = {
  		id: service.box.id,
  		type: service.typeBox,
  		status: service.statusBox
  	};
		let accountsReceivable = {
			box: box,
			paymentMade: false,
			payDay: service.payDay || null,
			type: service.typePay || null,
			tenant: service.tenant || null,
			amount: service.amount || 0,
			extras: service.extras || 0,
			charged: service.charged || 0,
			payDate: null
		}
		accountsReceivable['collect'] = (Number(accountsReceivable.amount) + Number(accountsReceivable.extras)) - Number(accountsReceivable.charged);
		if (accountsReceivable['collect'] == 0) {
			accountsReceivable.paymentMade = true;
			accountsReceivable['payDate'] = new Date();
		}
		let self = this;
    let promise = new Promise((resolve, reject) => {
			self.updateBox(service.box.key, box).then(response => {
				self.accountsReceivableRef.push(accountsReceivable);
			});
      resolve();
    });
    return promise;
  }

	public updateBox(key, box) {
		return new Promise((resolve, reject) => {
			this.boxesRef.update(key, box);
			resolve();
		});
	}

	public updateAccountReceivable(accountReceivable) {
		let box = {
  		id: accountReceivable.box.id,
  		type: accountReceivable.typeBox,
  		status: accountReceivable.statusBox
  	};
		let accountsReceivable = {
			box: box,
			paymentMade: false,
			payDay: accountReceivable.payDay || null,
			type: accountReceivable.typePay || null,
			tenant: accountReceivable.tenant || null,
			amount: accountReceivable.amount || 0,
			extras: accountReceivable.extras || 0,
			charged: accountReceivable.charged || 0,
			payDate: null
		}
		let self = this;
		accountsReceivable['collect'] = 0;
		accountsReceivable['collect'] = (Number(accountsReceivable.amount) + Number(accountsReceivable.extras)) - Number(accountsReceivable.charged);
		if (accountsReceivable['collect'] == 0) {
			accountsReceivable.paymentMade = true;
			accountsReceivable.payDate = new Date();
		}
		let promise = new Promise((resolve, reject) => {
			self.updateBox(accountReceivable.box.key, box).then(response => {
				self.accountsReceivableRef.update(accountReceivable.key, accountsReceivable);
			});
      resolve();
    });
    return promise;
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

	public getTypePay() {
		return this.typePayRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
	}

	public getAccountsReceivable() {
		return this.accountsReceivableRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
	}

	public removeEntry(accountReceivable) {
		this.accountsReceivableRef.remove(accountReceivable.key);
	}
}
