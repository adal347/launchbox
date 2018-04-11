import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TenantsProvider {

  tenantsRef: AngularFireList<any>;
	constructor(public db: AngularFireDatabase) {
    this.tenantsRef = this.db.list('tenants');
	}

  public createTentant(tenant) {
  	this.tenantsRef.push(tenant);
  }

	public getTenants() {
		return this.tenantsRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

	}

	public removeTenant(tenant) {
		this.tenantsRef.remove(tenant.key);
	}

}
