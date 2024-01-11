import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  user = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
  };

  constructor(private router: Router) { }

  goBack() {
    console.log('Navigating back...');
    this.router.navigate(['/']);
  }

  navigateToRegistration() {
    console.log('Navigating to registration...');
    this.router.navigate(['/registration']);
  }
}
