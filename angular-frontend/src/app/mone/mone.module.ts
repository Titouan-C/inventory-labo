import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { NewUserComponent } from './new-user/new-user.component';
import { ModificationComponent } from './modification/modification.component';
import { ModPasseComponent } from './mod-passe/mod-passe.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    NewUserComponent,
    ModificationComponent,
    ModPasseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    NewUserComponent,
    ModificationComponent
  ],
  providers: [
    AuthService,
    LoginComponent
  ]
})
export class MoneModule {
  users = [];
}
