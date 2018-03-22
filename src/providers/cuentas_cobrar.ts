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

  public createNewEntry(service) {
  	let box = {
  		id: service.box.id,
  		type: service.typeBox,
  		status: service.statusBox
  	};
  	let tenant = {
  		name: service.nameTenant || null,
  		lastname: service.lastnameTenant || null
  	}
		let accountsReceivable = {
			box: box,
			paymentMade: false,
			payDay: service.payDay || null,
			type: service.typePay || null,
			amount: service.amount || null,
			payDate: null
		}
		this.updateBox(service.box.key, box).then(response => {
			if (!tenant.name) {
				this.createNewAccountReceivable(null, accountsReceivable);
			} else {
				this.findTenant(tenant, accountsReceivable);
			}
		});

  }

  public createNewTentant(tenant, accountsReceivable) {
  	this.tenantsRef.push(tenant);
		//this.findTenant(tenant, accountsReceivable);
  }

  public createNewAccountReceivable(tenant, accountsReceivable) {
		accountsReceivable['tenant'] = tenant;
  	this.accountsReceivableRef.push(accountsReceivable);
  }

	public updateBox(key, box) {
		return new Promise((resolve, reject) => {
			this.boxesRef.update(key, box);
			resolve();
		});
	}

	public updateAccountReceivable(accountReceivable) {
		this.accountsReceivableRef.update(accountReceivable.key, accountReceivable);
	}

	public findTenant(tenant, accountsReceivable) {
		let tenants = this.db.list('tenants', ref => ref.orderByChild('lastname').equalTo(tenant.lastname))
									.snapshotChanges().map( data => {
			return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
		});
		tenants.forEach(items => {
			if (items.length === 0) {
				this.createNewTentant(tenant, accountsReceivable);
			} else {
				let flag = false;
				for (let i = 0; i < items.length; i++) {
					if (items[i].name === tenant.name) {
						flag = true;
						this.createNewAccountReceivable(tenant, accountsReceivable);
					}
				}
				if (!flag) {
					this.createNewTentant(tenant, accountsReceivable);
				}
			}
		});
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
