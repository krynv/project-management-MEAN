import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	messageClass;
	message;

	id = '';
	username = '';
	email = '';
	fullName = '';
	jobTitle = '';
	admin = false;
	participatingProjects;

	constructor(
		private authService: AuthService,
		private projectService: ProjectService,
	) { }

	convertToDate(dateString) {
		return new Date(dateString);
	}

	getAllProjects() {
		this.authService.getProfile().subscribe(profile => {
			this.id = profile.user._id;
			this.admin = profile.user.admin;
			this.username = profile.user.username;
			this.email = profile.user.email;
			this.fullName = profile.user.fullName;
			this.jobTitle = profile.user.jobTitle;
			this.participatingProjects = profile.user.participatingProjects;
		});
	}

	unassignFromProject(id) {
		this.projectService.unassignFromProject(id).subscribe(data => {
			this.getAllProjects();
		});
	}

	setProjectStatus(projectID, status) {
		this.projectService.setProjectStatus(projectID, status).subscribe(data => {
			if (!data.success) {
				this.messageClass = 'alert alert-danger'; 
				this.message = data.message; 
			} else {
				this.getAllProjects();
				
				setTimeout(() => {
					this.messageClass = 'alert alert-success'; 
					this.message = false;
				}, 2000);
			}
		});
	}
	
	ngOnInit() {
		this.getAllProjects();
	}

}