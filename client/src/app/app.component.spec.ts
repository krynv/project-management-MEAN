import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectComponent } from './components/project/project.component';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { DeleteProjectComponent } from './components/project/delete-project/delete-project.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { EditPasswordComponent } from './components/profile/edit-password/edit-password.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';

import { APP_BASE_HREF } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ProjectService } from './services/project.service';
import { UserService } from './services/user.service';

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
				EditProjectComponent,
				DeleteProjectComponent,
				PublicProfileComponent,
				UserComponent,
				EditUserComponent,
				DeleteUserComponent,
				EditPasswordComponent
			],
			imports: [
				BrowserModule,
				HttpModule,
				AppRoutingModule,
				ReactiveFormsModule,
				FormsModule,
				FlashMessagesModule.forRoot()
			],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, AuthGuard, NotAuthGuard, ProjectService, UserService],
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
