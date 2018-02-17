import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	admin = false;
	users;

	constructor(private authService: AuthService, private userService: UserService) { }

	isAdmin() {
		return this.admin;
	}

	getAllUsers() {
		this.userService.getAllUsers().subscribe(data => {
			this.users = data.users;
		});
	}

	ngOnInit() {
		this.authService.getProfile().subscribe(profile => {
			this.admin = profile.user.admin;
		});

		this.getAllUsers();
	}

}
