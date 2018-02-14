import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ProjectService {

	options;
	domain = this.authService.domain;

	constructor(
		private authService: AuthService,
		private http: Http
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

	newProject(project) {
		this.createAuthenticationHeaders();
		return this.http.post(`${this.domain}/projects/newProject`, project, this.options).map(res => res.json());
	}

	getAllProjects() {
		this.createAuthenticationHeaders();
		return this.http.get(`${this.domain}/projects/allProjects`, this.options).map(res => res.json());
	}

	getSingleProject(id) {
		this.createAuthenticationHeaders();
		return this.http.get(`${this.domain}/projects/singleProject/${id}`, this.options).map(res => res.json());
	}

	editProject(project) {
		this.createAuthenticationHeaders();
		return this.http.put(`${this.domain}/projects/updateProject/`, project, this.options).map(res => res.json());
	}

	deleteProject(id) {
		this.createAuthenticationHeaders();
		return this.http.delete(`${this.domain}/projects/deleteProject/${id}`, this.options).map(res => res.json());
	}

	assignToProject(id) {
		const projectData = { id: id };
		return this.http.put(`${this.domain}/projects/assignToProject/`, projectData, this.options).map(res => res.json());
	}

	postComment(id, comment) {
		this.createAuthenticationHeaders(); 
		
		const projectData = {
			id: id,
			comment: comment
		}
		
		return this.http.post(`${this.domain}/projects/comment`, projectData, this.options).map(res => res.json());
	}

}