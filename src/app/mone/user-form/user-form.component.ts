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

  constructor(private router: Router) {}

  goBack() {
    // Implement navigation logic to go back
    console.log('Navigating back...');
    // Assuming you want to go to the home page
    this.router.navigate(['/']);
  }

  navigateToRegistration() {
    // Implement navigation logic to go to the registration page
    console.log('Navigating to registration...');
    this.router.navigate(['/registration']); // Update 'registration' with the actual route path
  }
}
