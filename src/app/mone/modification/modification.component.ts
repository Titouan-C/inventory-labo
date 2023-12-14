// modification.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css'],
})
export class ModificationComponent implements OnInit {
  Userform = this.fb.group({
    Nom: this.fb.control(''),
    Prenom: this.fb.control(''),
    Mail: this.fb.control(''),
    Ecole: this.fb.control(''),
    Role: this.fb.control(''),
    Password: this.fb.control(''),
    ConfirmPassword: this.fb.control(''),
  });

  submitted = false;

  constructor(private fb: FormBuilder, private /*authService: AuthService*/) {}

  ngOnInit() {
    this.submitted = false;

    const currentUser = this./*authService.getCurrentUser()*/;

    if (currentUser) {
      this.Userform.patchValue(currentUser);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.Userform.valid) {
      const newPassword = this.Userform.get('Password')?.value;
      const confirmPassword = this.Userform.get('ConfirmPassword')?.value;

      // Perform password validation
      if (newPassword === confirmPassword) {
        const updatedData = { ...this.Userform.value };
        this./*authService.updateCurrentUser*/(updatedData);
        console.log('User updated:', this./*authService.getCurrentUser()*/);
      } else {
        console.log('Password and Confirm Password do not match.');
      }
    }
  }

  resetForm() {
    const currentUser = this./*authService.getCurrentUser()*/;
    if (currentUser) {
      this.Userform.patchValue(currentUser);
    }
  }
}
