import { Component, Output, EventEmitter } from '@angular/core';
import { NewUser } from '../new-user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-mod-passe',
  templateUrl: './mod-passe.component.html',
  styleUrls: ['./mod-passe.component.css'],
})
export class ModPasseComponent {
  model: NewUser | null = null;
  @Output() emitUser: EventEmitter<NewUser> = new EventEmitter<NewUser>();

  Userform = this.fb.group(
    {
      actualPassword: this.fb.control('', [Validators.required]),
      Password: this.fb.control('', [Validators.required]),
      ConfirmPassword: this.fb.control('', [Validators.required]),
    },
    { updateOn: 'submit' }
  );

  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.submitted = false;

    if (this.model === null) {
      this.model = new NewUser();
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.Userform.valid) {
      const actualPassword = this.Userform.get('actualPassword')?.value;
      const newPassword = this.Userform.get('Password')?.value;
      const confirmPassword = this.Userform.get('ConfirmPassword')?.value;

      if (newPassword === confirmPassword) {
        if (this.authService.getCurrentUser()) {
          if (this.authService.getCurrentUser()?.Password === actualPassword) {
            this.authService.modificationPasswordCurrentUser(newPassword!);
            alert("Updated password")
            this.router.navigate(['/']);
          } else {
            alert("Incorrect actual password");
          }
        } else {
          alert("Error : you are not connected")
          this.router.navigate(['/user/login']);
        }
      } else {
        alert('Password and Confirm Password do not match.');
      }
    }
  }

  resetForm() {
    if (this.model !== null) {
      this.Userform.patchValue({
        Password: '',
        ConfirmPassword: '',
      });
    }
  }
}
