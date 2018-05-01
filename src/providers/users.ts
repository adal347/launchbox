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

	public updateUser(user) {
    let self = this;
    let promise = new Promise((resolve, reject) => {
      self.usersRef.update(user.key, {
				name: user.name,
				lastname: user.lastname,
				permission: user.permission,
				email: user.email
			});
      resolve();
    });
    return promise;
	}

	public removeUser(user) {
    let self = this;
    let promise = new Promise((resolve, reject) => {
      self.usersRef.remove(user.key);
      resolve();
    });
    return promise;
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

}
