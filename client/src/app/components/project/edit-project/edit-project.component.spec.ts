import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectComponent } from './edit-project.component';

import { AppComponent } from '../../../app.component';
import { HomeComponent } from '../../home/home.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RegisterComponent } from '../../register/register.component';
import { LoginComponent } from '../../login/login.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ProjectComponent } from '../../project/project.component';
import { ProfileComponent } from '../../profile/profile.component';

import { HttpModule } from '@angular/http';
import { AppRoutingModule } from '../../../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AuthGuard } from '../../../guards/auth.guard';
import { NotAuthGuard } from '../../../guards/notAuth.guard';
import { ProjectService } from '../../../services/project.service';

describe('EditProjectComponent', () => {
	let component: EditProjectComponent;
	let fixture: ComponentFixture<EditProjectComponent>;

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
			],
			imports: [
				HttpModule,
				AppRoutingModule,
				ReactiveFormsModule,
				FormsModule,
				FlashMessagesModule
			],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, AuthGuard, NotAuthGuard, ProjectService],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EditProjectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});