import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModPasseComponent } from './mod-passe/mod-passe.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModPasseComponent, NewUserComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ModPasseComponent, NewUserComponent],
})
export class MoneModule {}
