import { Injectable } from '@angular/core';
import { AngularFireDatabase, /*FirebaseListObservable,*/ AngularFireList } from 'angularfire2/database';

@Injectable()
export class CuentasCobrarProvider {

	boxesRef: AngularFireList<any>;
	boxesStatusRef: AngularFireList<any>;
	typeBoxRef: AngularFireList<any>;
	typePayRef: AngularFireList<any>;

	constructor(public db: AngularFireDatabase) {
		this.boxesRef = this.db.list('boxes');
		this.boxesStatusRef = this.db.list('statusBox');
		this.typeBoxRef = this.db.list('typoBox');
		this.typePayRef = this.db.list('typoPago');
	}

  public createNewEntry(service) {
  	// let box = {
  	// 	id: service.box,
  	// 	tipoId: service.typeBox,
  	// 	statusId: service.statusBox
  	// }
  	// let inquilino = {
  	// 	id:null,
  	// 	nombre:service.nameInquilino,
  	// 	apellidos: service.lastNameInquilino
  	// }
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
  	// this.db.list('boxes').(box);

    console.log('createNewEntryService');

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
}
