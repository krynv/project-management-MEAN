import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	admin = false;
	users;
	loadingUsers = false;

	constructor(
		private authService: AuthService, 
		private userService: UserService,
		private router: Router,
	) { }

	isAdmin() {
		return this.admin;
	}

	getAllUsers() {
		this.userService.getAllUsers().subscribe(data => {
			this.users = data.users;
		});
	}

	reloadUsers() {
		this.loadingUsers = true;
		this.getAllUsers();

		setTimeout(() => {
			this.loadingUsers = false;
		}, 4000);
	}

	ngOnInit() {
		this.authService.getProfile().subscribe(profile => {
			this.admin = profile.user.admin;
			
			if (!profile.user.admin) {
				this.router.navigate(['/dashboard']);
			} 
		});

		this.getAllUsers();
	}

}
