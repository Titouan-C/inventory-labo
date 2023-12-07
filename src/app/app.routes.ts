import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './mone/navbar/navbar.component';

export const routes: Routes = [
    { path: 'home/', component: NavbarComponent },
    { path: '', redirectTo: 'home/', pathMatch: 'full' }
];
