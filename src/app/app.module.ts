import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserFormComponent } from './mone/user-form/user-form.component';

@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
})
export class AppModule { }
