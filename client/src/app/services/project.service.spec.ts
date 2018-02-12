import { TestBed, inject } from '@angular/core/testing';

import { ProjectService } from './project.service';

import { ProjectComponent } from '../components/project/project.component';

import { AppComponent } from '../app.component';
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProfileComponent } from '../components/profile/profile.component';

import { HttpModule } from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { APP_BASE_HREF } from '@angular/common';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuthGuard } from '../guards/notAuth.guard';
import { AuthService } from './auth.service';

describe('ProjectService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				NavbarComponent,
				HomeComponent,
				DashboardComponent,
				RegisterComponent,
				LoginComponent,
				ProfileComponent,
				ProjectComponent
			],
			imports: [
				HttpModule,
				AppRoutingModule,
				ReactiveFormsModule,
				FlashMessagesModule
			],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, AuthGuard, NotAuthGuard, ProjectService],
		});
	});

	it('should be created', inject([ProjectService], (service: ProjectService) => {
		expect(service).toBeTruthy();
	}));
});