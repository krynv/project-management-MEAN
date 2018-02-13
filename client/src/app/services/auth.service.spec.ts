import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ProjectComponent } from '../components/project/project.component';

import { AppComponent } from '../app.component';
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { EditProjectComponent } from '../components/project/edit-project/edit-project.component';
import { DeleteProjectComponent } from '../components/project/delete-project/delete-project.component';

import { HttpModule } from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { APP_BASE_HREF } from '@angular/common';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuthGuard } from '../guards/notAuth.guard';
import { ProjectService } from './project.service';

describe('AuthService', () => {
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
			ProjectComponent,
			EditProjectComponent,
			DeleteProjectComponent,
		],
		imports: [
			HttpModule,
			AppRoutingModule,
			ReactiveFormsModule,
			FormsModule,
			FlashMessagesModule
		],
		providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, AuthGuard, NotAuthGuard, ProjectService],
	});
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
