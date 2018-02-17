import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ProjectComponent } from './components/project/project.component';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { DeleteProjectComponent } from './components/project/delete-project/delete-project.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { EditPasswordComponent } from './components/profile/edit-password/edit-password.component';

const appRoutes: Routes = [
    { 
        path: '', 
        component: HomeComponent, 
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotAuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotAuthGuard],
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'project',
        component: ProjectComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'edit-project/:id',
        component: EditProjectComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'delete-project/:id',
        component: DeleteProjectComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'user/:username',
        component: PublicProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'edit-user/:id',
        component: EditUserComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'delete-user/:id',
        component: DeleteUserComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'edit-personal-password/:id',
        component: EditPasswordComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '**', 
        component: HomeComponent,
    }
]; 

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
  
