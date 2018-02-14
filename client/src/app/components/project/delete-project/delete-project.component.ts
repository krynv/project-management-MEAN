import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-delete-project',
	templateUrl: './delete-project.component.html',
	styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

	message;
	messageClass;
	foundProject = false;
	processing = false;
	project;
	currentUrl;

	constructor(
		private projectService: ProjectService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) { }

	deleteProject() {
		this.processing = true;

		this.projectService.deleteProject(this.currentUrl.id).subscribe(data => {
			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
			} else {
				this.messageClass = 'alert alert-success';
				this.message = data.message;

				setTimeout(() => {
					this.router.navigate(['/project']);
				}, 2000);
			}
		});
	}

	ngOnInit() {
		this.currentUrl = this.activatedRoute.snapshot.params;

		this.projectService.getSingleProject(this.currentUrl.id).subscribe(data => {

			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
			} else {

				this.project = {
					title: data.project.title,
					body: data.project.body,
					createdBy: data.project.createdBy,
					createdAt: data.project.createdAt,
					dueDate: data.project.dueDate,
					numberOfAssignees: data.project.numberOfAssignees,
					projectStatus: data.project.projectStatus,
				}

				this.foundProject = true;
			}
		});
	}
}
