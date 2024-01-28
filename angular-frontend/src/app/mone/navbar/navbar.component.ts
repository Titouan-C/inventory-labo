import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  login: Observable<boolean> = of(false);

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("Current user:", this.authService.getCurrentUser());
    if (this.authService.getCurrentUser()) {
      this.login = of(true);
    } else {
      this.login = of(false);
    }
  }
}
