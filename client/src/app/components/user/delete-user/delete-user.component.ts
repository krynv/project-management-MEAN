import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-delete-user',
	templateUrl: './delete-user.component.html',
	styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

	message;
	messageClass;
	foundUser = false;
	processing = false;
	user;
	currentUrl;

	constructor(
		private userService: UserService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) { }

	deleteUser() {
		this.processing = true;

		this.userService.deleteUser(this.currentUrl.id).subscribe(data => {
			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
			} else {
				this.messageClass = 'alert alert-success';
				this.message = data.message;

				setTimeout(() => {
					this.router.navigate(['/users']);
				}, 2000);
			}
		});
	}

	ngOnInit() {
		this.currentUrl = this.activatedRoute.snapshot.params;

		this.userService.getSingleUser(this.currentUrl.id).subscribe(data => {

			if (!data.success) {
				this.messageClass = 'alert alert-danger';
				this.message = data.message;
			} else {
				this.user = data.user;
				this.foundUser = true;
			}
		});
	}

}
