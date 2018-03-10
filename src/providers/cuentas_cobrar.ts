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
		this.typeBoxRef = this.db.list('typoBox');
		this.typePayRef = this.db.list('typoPago');
		this.tenantsRef = this.db.list('tenants');
	}

  public createNewEntry(service) {
  	// let box = {
  	// 	id: service.box.id,
  	// 	tipo: service.typeBox.id,
  	// 	status: service.statusBox.id
  	// };
		// this.updateBox(service.box.key, box);
  	let tenant = {
  		name:service.nameInquilino,
  		lastname: service.lastNameInquilino
  	}
		this.findTenant(tenant);
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
		this.boxesRef.update(service.box.key, box);
	}

	public getBoxes() {
		return this.boxesRef.snapshotChanges().map( data => {
			return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
		});
	}

	public findTenant(tenant) {
		let tenantQuery = this.db.collection('tenants', ref => ref.where('lastname', '==', tenant.lastname).where('name', '==', tenant.name));
		tenantQuery.subscribe(tenants => console.log(tenants));
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
