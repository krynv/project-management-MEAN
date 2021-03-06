import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	form: FormGroup;
	message;
	messageClass;
	processing = false;
	emailValid;
	emailMessage;
	usernameValid;
	usernameMessage;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
	) {
		this.createForm();
	}


	createForm() {
		this.form = this.formBuilder.group({

			email: ['', Validators.compose([
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(30),
				this.validateEmail
			])],
			username: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(15),
				this.validateUsername
			])],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				this.validatePassword
			])],
			fullName: ['', Validators.compose([
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(35),
				this.validateName
			])],
			jobTitle: ['', Validators.compose([
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(35),
				this.validateJobTitle
			])],

			confirm: ['', Validators.required]
		},
			{
				validator: this.matchingPasswords('password', 'confirm')
			});
	}

	disableForm() {
		this.form.controls['email'].disable();
		this.form.controls['username'].disable();
		this.form.controls['fullName'].disable();
		this.form.controls['jobTitle'].disable();
		this.form.controls['password'].disable();
		this.form.controls['confirm'].disable();
	}

	enableForm() {
		this.form.controls['email'].enable();
		this.form.controls['username'].enable();
		this.form.controls['fullName'].enable();
		this.form.controls['jobTitle'].enable();
		this.form.controls['password'].enable();
		this.form.controls['confirm'].enable();
	}

	validateEmail(controls) {

		const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

		if (regExp.test(controls.value)) {
			return null;
		} else {
			return { 'validateEmail': true }
		}
	}


	validateUsername(controls) {

		const regExp = new RegExp(/^[a-zA-Z0-9]+$/);

		if (regExp.test(controls.value)) {
			return null;
		} else {
			return { 'validateUsername': true }
		}
	}


	validatePassword(controls) {

		const regExp = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,60}$/);

		if (regExp.test(controls.value)) {
			return null;
		} else {
			return { 'validatePassword': true }
		}
	}

	validateName(controls) {
		const regExp = new RegExp(/\b([A-Z]{1}[a-z]{1,30}[- ]{0,1}|[A-Z]{1}[- \']{1}[A-Z]{0,1}[a-z]{1,30}[- ]{0,1}|[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}){2,5}/);

		if (regExp.test(controls.value)) {
			return null;
		} else {
			return { 'validateName': true }
		}
	}

	validateJobTitle(controls) {
		const regExp = new RegExp(/^([a-zA-Z ]){1,35}$/);

		if (regExp.test(controls.value)) {
			return null;
		} else {
			return { 'validateJobTitle': true }
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

	onRegisterSubmit() {
		this.processing = true;
		this.disableForm();

		const user = {
			email: this.form.get('email').value,
			username: this.form.get('username').value,
			fullName: this.form.get('fullName').value,
			jobTitle: this.form.get('jobTitle').value,
			password: this.form.get('password').value,
		};

		this.authService.registerUser(user).subscribe(data => {
			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
				this.processing = false;
				this.enableForm();
			} else {
				this.messageClass = 'alert alert-success';
				this.message = data.message;

				setTimeout(() => {
					this.router.navigate(['/login']); // once registered successfully, send the user to the login page
				}, 2000);
			}
		});
	}

	checkEmail() {
		this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
			if (!data.success) {
				this.emailValid = false;
				this.emailMessage = data.message;
			} else {
				this.emailValid = true;
				this.emailMessage = data.message;
			}
		});
	}

	checkUsername() {
		this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
			if (!data.success) {
				this.usernameValid = false;
				this.usernameMessage = data.message;
			} else {
				this.usernameValid = true;
				this.usernameMessage = data.message;
			}
		});
	}

	ngOnInit() {

	}

}