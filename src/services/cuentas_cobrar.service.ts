import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CuentasCobrarService {

	db: AngularFireDatabase;
	s;
  public createNewEntry(service) {
  	let box = {
  		id: service.box,
  		tipoId: service.typeBox,
  		statusId: service.statusBox
  	}
  	let inquilino = {
  		id:null,
  		nombre:service.nameInquilino,
  		apellidos: service.lastNameInquilino
  	}
  	let cuentasCobrar = {
  		id: null,
  		boxId: service.box,
  		pagoEfectuado: false,
  		diaPago: service.payDay,
  		tipoId:service.typePay,
  		montoRenta: service.amount,
  		inquilinoId:null

  	}
  	//this.s = this.db.list('boxes').push(box);

    console.log('createNewEntryService');
    
  }
}
