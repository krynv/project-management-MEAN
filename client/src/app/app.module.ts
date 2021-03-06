import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ProjectComponent } from './components/project/project.component';
import { ProjectService } from './services/project.service';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { DeleteProjectComponent } from './components/project/delete-project/delete-project.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { UserService } from './services/user.service';
import { EditPasswordComponent } from './components/profile/edit-password/edit-password.component';

@NgModule({
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
        FlashMessagesModule.forRoot(),
    ],
    providers: [AuthService, AuthGuard, NotAuthGuard, ProjectService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule { }
