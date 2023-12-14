import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  form: FormGroup;

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

    if (this.authService.login(mail, password)) {
      this.router.navigate(['/']);
      alert('Connecté en tant que ' + this.authService.getMail());
    } else {
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  }
}
