import { Routes } from '@angular/router';
import { HomeComponent } from './mone/home/home.component';
import { LoginComponent } from './mone/auth/login/login.component';
import { LogoutComponent } from './mone/auth/logout/logout.component';
import { NewUserComponent } from './mone/new-user/new-user.component';
import { ModificationComponent } from './mone/modification/modification.component';
import { ModPasseComponent } from './mone/mod-passe/mod-passe.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'user/register', component: NewUserComponent },
    { path: 'user/login', component: LoginComponent },
    { path: 'user/logout', component: LogoutComponent },
    { path: 'user/update', component: ModificationComponent },
    { path: 'user/update-pwd', component: ModPasseComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
