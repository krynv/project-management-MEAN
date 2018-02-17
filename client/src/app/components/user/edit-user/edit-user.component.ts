import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

	message;
	messageClass;
	user;
	processing = false;
	currentUrl;
	loading = true;

	constructor(		
		private location: Location,
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		private router: Router,
	) { }

	updateUserSubmit() {
		this.processing = true; 

		this.userService.editUser(this.user).subscribe(data => {
			
			if (!data.success) {
				this.messageClass = 'alert alert-danger'; 
				this.message = data.message; 
				this.processing = false; 
			} else {
				this.messageClass = 'alert alert-success'; 
				this.message = data.message; 

				setTimeout(() => {
					this.router.navigate(['/users']); 
				}, 2000);
			}
		});
	}

	goBack() {
		this.location.back();
	}

	ngOnInit() {
		this.currentUrl = this.activatedRoute.snapshot.params; 
		this.userService.getSingleUser(this.currentUrl.id).subscribe(data => {
			
			if (!data.success) {
				this.messageClass = 'alert alert-danger'; 
				this.message = data.message; 
			} else {
				this.user = data.user; 
				this.loading = false; 
			}
		});
	}

}
