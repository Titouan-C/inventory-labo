import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.submitted = false;

    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.Userform.patchValue(currentUser);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.Userform.valid) {
      const newPassword = this.Userform.get('Password')?.value;
      const confirmPassword = this.Userform.get('ConfirmPassword')?.value;

      if (newPassword === confirmPassword) {
        const user = this.authService.getCurrentUser();
        if (user) {
          const formValues = this.Userform.getRawValue();
          const updatedData = {
            id: user.id!,
            Nom: formValues.Nom || null,
            Prenom: formValues.Prenom || null,
            Mail: formValues.Mail || null,
            Ecole: formValues.Ecole || null,
            Role: formValues.Role || null,
            Password: formValues.Password || null,
            ConfirmPassword: formValues.ConfirmPassword || null,
          };
          this.authService.updateCurrentUser(updatedData);
          alert('User updated:' + this.authService.getCurrentUser());
          this.router.navigate(['/']);
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
