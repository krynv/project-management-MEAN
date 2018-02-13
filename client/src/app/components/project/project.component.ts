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
	processing = false;
	username;
	projects;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private projectService: ProjectService
	) {
		this.createNewProjectForm();
	}

	createNewProjectForm() {
		this.form = this.formBuilder.group({
			title: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(50),
				Validators.minLength(5),
				this.alphaNumericValidation
			])],
			body: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(500),
				Validators.minLength(5)
			])]
		})
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

	draftComment() {

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

	ngOnInit() {
		this.authService.getProfile().subscribe(profile => {
			this.username = profile.user.username;
		});

		this.getAllProjects();
	}

}