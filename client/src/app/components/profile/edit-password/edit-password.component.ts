import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-edit-password',
	templateUrl: './edit-password.component.html',
	styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

	form: FormGroup;
	message;
	messageClass;
	user;
	processing = false;
	currentUrl;

	constructor(
		private formBuilder: FormBuilder,
		private location: Location,
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		private router: Router,
	) {
		this.createForm();
	 }

	 createForm() {
		this.form = this.formBuilder.group({
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				this.validatePassword
			])],

			confirm: ['', Validators.required]
		},
			{
				validator: this.matchingPasswords('password', 'confirm')
			});
	}

	disableForm() {
		this.form.controls['password'].disable();
		this.form.controls['confirm'].disable();
	}

	enableForm() {
		this.form.controls['password'].enable();
		this.form.controls['confirm'].enable();
	}
	

	validatePassword(controls) {

		const regExp = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,60}$/);

		if (regExp.test(controls.value)) {
			return null;
		} else {
			return { 'validatePassword': true }
		}
	}

	matchingPasswords(password, confirm) {
		return (group: FormGroup) => {

			if (group.controls[password].value === group.controls[confirm].value) {
				return null;
			} else {
				return { 'matchingPasswords': true }
			}
		}
	}

	updatePersonalPasswordSubmit() {
		this.processing = true;
		this.disableForm();

		const user = {
			_id: this.currentUrl.id,
			password: this.form.get('password').value,
		};

		this.userService.updatePersonalPassword(user).subscribe(data => {

			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
				this.processing = false;
				this.enableForm();
			} else {
				this.messageClass = 'alert alert-success';
				this.message = data.message;

				setTimeout(() => {
					this.router.navigate(['/profile']);
				}, 2000);
			}
		});
	}

	goBack() {
		this.location.back();
	}

	ngOnInit() {
		this.currentUrl = this.activatedRoute.snapshot.params;

		this.userService.singleUserForPasswordChange(this.currentUrl.id).subscribe(data => {

			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
			} else {
				this.user = data.user;
			}
		});
	}
}