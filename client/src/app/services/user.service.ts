import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

	options;
	domain = this.authService.domain;

	constructor(
		private authService: AuthService,
		private http: Http,
	) { }


	createAuthenticationHeaders() {
		this.authService.loadToken();

		this.options = new RequestOptions({
			headers: new Headers({
				'Content-Type': 'application/json',
				'authorization': this.authService.authToken
			})
		});
	}

	getAllUsers() {
		this.createAuthenticationHeaders();
		return this.http.get(`${this.domain}/users/allUsers`, this.options).map(res => res.json());
	}

	editUser(user) {
		this.createAuthenticationHeaders();
		return this.http.put(`${this.domain}/users/updateUser/`, user, this.options).map(res => res.json());
	}

	getSingleUser(id) {
		this.createAuthenticationHeaders();
		return this.http.get(`${this.domain}/users/singleUser/${id}`, this.options).map(res => res.json());
	}

	deleteUser(id) {
		this.createAuthenticationHeaders();
		return this.http.delete(`${this.domain}/projects/deleteUser/${id}`, this.options).map(res => res.json());
	}

}
