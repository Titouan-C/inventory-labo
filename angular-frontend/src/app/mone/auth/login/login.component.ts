import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NewUser } from '../../new-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  form: FormGroup;
  
  private currentUser: NewUser | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      mail: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const { mail, password } = this.form.value;
    this.executeFetchRequest();
    this.router.navigate(['/']);
    return;   
  }

  async executeFetchRequest() {
    try {
      const fetchRequestMail = this.form.get('mail')?.value;
      const fetchRequestPassword = this.form.get('password')?.value;

        const response = await fetch(`https://localhost:8000/export-json?type=LOGIN&mail=${fetchRequestMail}&password=${fetchRequestPassword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.currentUser = data;
        if (this.currentUser != null) {
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
        throw error;
    }
  }
}
