import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	username = '';
	email = '';
	fullName = '';
	jobTitle = '';
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
	
	ngOnInit() {
		this.getAllProjects();
	}

}