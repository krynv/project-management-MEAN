import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	admin = false;

	constructor(private authService: AuthService) { }

	isAdmin() {
		return this.admin;
	}

	ngOnInit() {
		this.authService.getProfile().subscribe(profile => {
			this.admin = profile.user.admin;
		});
	}

}
