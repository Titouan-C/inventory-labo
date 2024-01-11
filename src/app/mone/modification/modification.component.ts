import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NewUser } from '../new-user.model';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css'],
})
export class ModificationComponent implements OnInit {
  Userform = this.fb.group({
    Nom: this.fb.control('', [
      Validators.required,
    ]),
    Prenom: this.fb.control('', [
      Validators.required,
    ]),
    Mail: this.fb.control('', [
      Validators.required,
    ]),
    Ecole: this.fb.control('', [
      Validators.required,
    ]),
    Role: this.fb.control('', [
      Validators.required,
    ]),
    Password: this.fb.control('', [
      Validators.required,
    ]),
    ConfirmPassword: this.fb.control('', [
      Validators.required,
    ]),
  });

  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.submitted = false;

    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.Userform.patchValue(currentUser);
      this.Userform.get('Password')?.setValue("");
      this.Userform.get('ConfirmPassword')?.setValue("");
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.Userform.valid) {
      const password = this.Userform.get('Password')?.value;
      const confirmPassword = this.Userform.get('ConfirmPassword')?.value;

      if (password === confirmPassword) {
        const user = this.authService.getCurrentUser();
        if (user) {
          const formValues = this.Userform.getRawValue();
          if (user.Password === password) {
            const updatedData = new NewUser(user.id!, formValues.Nom!, formValues.Prenom!, formValues.Mail!, formValues.Ecole!, formValues.Role!, formValues.Password!, formValues.ConfirmPassword!);
            this.authService.updateUser(updatedData);
            alert('User updated:' + this.authService.getCurrentUser());
            this.router.navigate(['/']);
          } else {
            alert('Please enter your correct password');
          }
        } else {
          alert('No current user found.');
        }
      } else {
        alert('Password and Confirm Password do not match.');
      }
    }
  }

  resetForm() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.Userform.patchValue(currentUser);
    }
  }
}
