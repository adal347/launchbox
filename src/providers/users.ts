import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class UsersProvider {

	usersRef: AngularFireList<any>;
	permissionsRef: AngularFireList<any>;
	constructor(public db: AngularFireDatabase) {
		this.usersRef = this.db.list('users');
		this.permissionsRef = this.db.list('permissions');
	}

	createUser(user) {
		this.usersRef.push({
			name: user.name,
			lastname: user.lastname,
			permission: user.permission,
			email: user.email
		});
	}

	public getPermissions() {
		return this.permissionsRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
	}

	public getUsers() {
		return this.usersRef.snapshotChanges().map( data => {
      return data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

	}

	public removeUser(user) {
		this.usersRef.remove(user.key);
	}

}
