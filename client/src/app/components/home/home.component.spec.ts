import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import { AppComponent } from '../../app.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { ProjectComponent } from '../project/project.component';

import { HttpModule } from '@angular/http';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { NotAuthGuard } from '../../guards/notAuth.guard';
import { ProjectService } from '../../services/project.service';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
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
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
