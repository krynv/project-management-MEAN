import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectComponent } from './components/project/project.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';

import { APP_BASE_HREF } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ProjectService } from './services/project.service';

describe('AppComponent', () => {
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
				ProjectComponent,
			],
			imports: [
				BrowserModule,
				HttpModule,
				AppRoutingModule,
				ReactiveFormsModule,
				FlashMessagesModule
			],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, AuthGuard, NotAuthGuard, ProjectService],
		}).compileComponents();
	}));
	
	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it(`should have the title of 'ManageR'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('ManageR');
	}));

	it('should render the navbar', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('app-navbar')).toBeTruthy();
	}));
});
