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
import { EditProjectComponent } from '../components/project/edit-project/edit-project.component';
import { DeleteProjectComponent } from '../components/project/delete-project/delete-project.component';
import { PublicProfileComponent } from '../components/public-profile/public-profile.component';
import { UserComponent } from '../components/user/user.component';
import { EditUserComponent } from '../components/user/edit-user/edit-user.component';
import { DeleteUserComponent } from '../components/user/delete-user/delete-user.component';
import { EditPasswordComponent } from '../components/profile/edit-password/edit-password.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { APP_BASE_HREF } from '@angular/common';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuthGuard } from '../guards/notAuth.guard';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

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
                ProjectComponent,
                EditProjectComponent,
                DeleteProjectComponent,
                PublicProfileComponent,
                UserComponent,
                EditUserComponent,
                DeleteUserComponent,
                EditPasswordComponent,
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
        });
    });

    it('should be created', inject([ProjectService], (service: ProjectService) => {
        expect(service).toBeTruthy();
    }));

    it('should have all functions', inject([ProjectService], (service: ProjectService) => {
        expect(service.createAuthenticationHeaders).toBeTruthy();
        expect(service.newProject).toBeTruthy();
        expect(service.getAllProjects).toBeTruthy();
        expect(service.getSingleProject).toBeTruthy();
        expect(service.editProject).toBeTruthy();
        expect(service.deleteProject).toBeTruthy();
        expect(service.assignToProject).toBeTruthy();
        expect(service.unassignFromProject).toBeTruthy();
        expect(service.postComment).toBeTruthy();
        expect(service.deleteComment).toBeTruthy();
        expect(service.setProjectStatus).toBeTruthy();
    }));
});