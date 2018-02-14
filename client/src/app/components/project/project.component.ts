import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

	messageClass;
	message;
	newProject = false;

	loadingProjects = false;
	form;
	commentForm;
	processing = false;
	username;
	projects;
	newComment = [];
	enabledComments = [];
	foundComment = false;
	currentDate: number = Date.now();

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private projectService: ProjectService,
	) {
		this.createNewProjectForm();
		this.createCommentForm();
	}

	convertToDate(dateString) {
		return new Date(dateString);
	}

	createNewProjectForm() {
		this.form = this.formBuilder.group({
			title: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(50),
				Validators.minLength(5),
				this.alphaNumericValidation,
			])],

			body: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(500),
				Validators.minLength(5)
			])]
		})
	}

	createCommentForm() {
		this.commentForm = this.formBuilder.group({
			comment: ['', Validators.compose([
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(200),
			])]
		})
	}

	enableCommentForm() {
		this.commentForm.get('comment').enable();
	}

	disableCommentForm() {
		this.commentForm.get('comment').disable();
	}

	enableFormNewProjectForm() {
		this.form.get('title').enable();
		this.form.get('body').enable();
	}

	disableFormNewProjectForm() {
		this.form.get('title').disable();
		this.form.get('body').disable();
	}

	alphaNumericValidation(controls) {
		const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);

		if (regExp.test(controls.value)) {
			return null;
		} else {
			return { 'alphaNumericValidation': true }
		}
	}

	newProjectForm() {
		this.newProject = true;
	}

	reloadProjects() {
		this.loadingProjects = true;
		this.getAllProjects();

		setTimeout(() => {
			this.loadingProjects = false;
		}, 4000);
	}

	draftComment(id) {
		this.commentForm.reset();
		this.newComment = [];
		this.newComment.push(id);
	}

	cancelSubmission(id) {
		const index = this.newComment.indexOf(id);
		this.newComment.splice(index, 1);
		this.commentForm.reset();
		this.enableCommentForm();
		this.processing = false;
	}

	onProjectSubmit() {
		this.processing = true;
		this.disableFormNewProjectForm();

		const project = {
			title: this.form.get('title').value,
			body: this.form.get('body').value,
			createdBy: this.username
		}

		this.projectService.newProject(project).subscribe(data => {

			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
				this.processing = false;
				this.enableFormNewProjectForm();
			} else {
				this.messageClass = 'alert alert-success';
				this.message = data.message;
				this.getAllProjects();

				setTimeout(() => {
					this.newProject = false;
					this.processing = false;
					this.message = false;
					this.form.reset();
					this.enableFormNewProjectForm();
				}, 2000);
			}
		});
	}

	goBack() {
		window.location.reload();
	}

	getAllProjects() {
		this.projectService.getAllProjects().subscribe(data => {
			this.projects = data.projects;
		});
	}

	assignToProject(id) {
		this.projectService.assignToProject(id).subscribe(data => {
			this.getAllProjects();
		});
	}

	unassignFromProject(id) {
		this.projectService.unassignFromProject(id).subscribe(data => {
			this.getAllProjects();
		});
	}

	postComment(id) {
		this.disableCommentForm();
		this.processing = true;
		const comment = this.commentForm.get('comment').value;

		this.projectService.postComment(id, comment).subscribe(data => {
			this.getAllProjects();

			const index = this.newComment.indexOf(id);
			this.newComment.splice(index, 1);
			
			this.enableCommentForm();
			this.commentForm.reset();
			this.processing = false;

			if (this.enabledComments.indexOf(id) < 0) {
				this.expand(id);
			}
		});
	}

	expand(id) {
		this.enabledComments.push(id);
	}

	collapse(id) {
		const index = this.enabledComments.indexOf(id);
		this.enabledComments.splice(index, 1);
	}

	deleteComment(projectID, commentID) {

		this.projectService.deleteComment(projectID, commentID).subscribe(data => {

			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
			} else {
				this.messageClass = 'alert alert-success';
				this.message = data.message;
				this.foundComment = true;
				this.getAllProjects();

				setTimeout(() => {
					this.foundComment = false;
					this.message = false;
				}, 2000);
			}
		});
	}

	ngOnInit() {
		this.authService.getProfile().subscribe(profile => {
			this.username = profile.user.username;
		});

		this.getAllProjects();
	}

}