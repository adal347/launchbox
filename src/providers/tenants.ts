import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TenantsProvider {

  tenantsRef: AngularFireList<any>;
	constructor(public db: AngularFireDatabase) {
    this.tenantsRef = this.db.list('tenants');
	}

  public getTenants() {
    return this.tenantsRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  public createTenant(tenant) {
    let self = this;
    let promise = new Promise((resolve, reject) => {
      self.tenantsRef.push(tenant);
      resolve();
    });
    return promise;
  }

	public updateTenant(tenant) {
    let self = this;
    let promise = new Promise((resolve, reject) => {
      this.tenantsRef.update(tenant.key, tenant);
      resolve();
    });
    return promise;
	}

	public removeTenant(tenant) {
    let self = this;
    let promise = new Promise((resolve, reject) => {
      this.tenantsRef.remove(tenant.key);
      resolve();
    });
    return promise;
	}

}
