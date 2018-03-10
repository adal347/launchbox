import { Injectable } from '@angular/core';
import { AngularFireDatabase, /*FirebaseListObservable,*/ AngularFireList } from 'angularfire2/database';

@Injectable()
export class CuentasCobrarProvider {

	boxesRef: AngularFireList<any>;
	boxesStatusRef: AngularFireList<any>;
	typeBoxRef: AngularFireList<any>;
	typePayRef: AngularFireList<any>;
	tenantsRef: AngularFireList<any>;

	constructor(public db: AngularFireDatabase) {
		this.boxesRef = this.db.list('boxes');
		this.boxesStatusRef = this.db.list('statusBox');
		this.typeBoxRef = this.db.list('typeBox');
		this.typePayRef = this.db.list('typePay');
		this.tenantsRef = this.db.list('tenants');
	}

  public createNewEntry(service) {
  	// let box = {
  	// 	id: service.box.id,
  	// 	typeId: service.typeBox.id,
  	// 	statusId: service.statusBox.id
  	// };
		// this.updateBox(service.box.key, box);
  	let tenant = {
  		name:service.nameTenant,
  		lastname: service.lastnameTenant
  	}
		console.log(this.findTenant(tenant));
  	// let cuentasCobrar = {
  	// 	id: null,
  	// 	boxId: service.box,
  	// 	pagoEfectuado: false,
  	// 	diaPago: service.payDay,
  	// 	tipoId:service.typePay,
  	// 	montoRenta: service.amount,
  	// 	inquilinoId:null
		//
  	// }

  }

	public updateBox(key, box) {
		this.boxesRef.update(key, box);
	}

	public getBoxes() {
		return this.boxesRef.snapshotChanges().map( data => {
			return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
		});
	}

	public findTenant(tenant) {
		let tenants = this.db.list('tenants', ref => ref.orderByChild('lastname').equalTo(tenant.lastname))
									.snapshotChanges().map( data => {
			data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
		});
		console.log(tenants);
		for (let i = 0; i < tenants.length; i++) {
			console.log(tenants[i]);
			console.log('not here');
			if (tenants[i].name === tenant.name) return true;
		}
		return false;
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
}
