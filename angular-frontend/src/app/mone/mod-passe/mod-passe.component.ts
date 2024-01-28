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

  private boolPassword = false;

  Userform = this.fb.group(
    {
      actualPassword: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),
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
      const newPassword = this.Userform.get('password')?.value;
      const confirmPassword = this.Userform.get('confirmPassword')?.value;

      if (newPassword === confirmPassword) {
        if (this.authService.getCurrentUser()) {
          this.executeFetchSelectRequest();
        } else {
          alert("Error : you are not connected")
          this.router.navigate(['/user/login']);
        }
      } else {
        alert('Password and ConecuteFetchRequestfirm Password do not match.');
      }
    }
  }

  resetForm() {
    if (this.model !== null) {
      this.Userform.patchValue({
        password: '',
        confirmPassword: '',
      });
    }
  }

  executeFetchInsertRequest() {
    const currentUser = this.authService.getCurrentUser();

    const fetchMail = currentUser?.mail;
    const fetchNewPassword = this.Userform.get('password')?.value;

    const fetchRequest = `https://localhost:8000/execute-sql?type=UPDATEPASSWORD&mail=${fetchMail}&password=${fetchNewPassword}`
    fetch(fetchRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .catch((error) => console.error('Erreur:', error));
  }

  executeFetchSelectRequest() {
    const currentUser = this.authService.getCurrentUser();
    const fetchRequestMail = currentUser?.mail;
    const fetchRequestPassword = this.Userform.get('actualPassword')?.value;

    fetch(`https://localhost:8000/export-json?type=VERIFY&mail=${fetchRequestMail}&password=${fetchRequestPassword}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          this.boolPassword = data;
          if (this.boolPassword) {
            this.executeFetchInsertRequest();
            alert("Updated password")
            this.router.navigate(['/']);
          } else {
            alert('Password not match.');
          }
      })
      .catch(error => {
          console.error('Erreur lors de la requête :', error);
          throw error;
      });
  }
}
