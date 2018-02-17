import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';

@Component({
	selector: 'app-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

	message;
	messageClass;
	project;
	processing = false;
	currentUrl;
	loading = true;

	constructor(
		private location: Location,
		private activatedRoute: ActivatedRoute,
		private projectService: ProjectService,
		private router: Router,
	) { 
		
	}

	updateProjectSubmit() {
		this.processing = true;

		this.projectService.editProject(this.project).subscribe(data => {

			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
				this.processing = false;
			} else {
				this.messageClass = 'alert alert-success';
				this.message = data.message;

				setTimeout(() => {
					this.router.navigate(['/project']);
				}, 2000);
			}
		});
	}

	goBack() {
		this.location.back();
	}

	ngOnInit() {
		this.currentUrl = this.activatedRoute.snapshot.params;
		this.projectService.getSingleProject(this.currentUrl.id).subscribe(data => {

			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
			} else {
				this.project = data.project;
				this.loading = false;
			}
		});
	}
}