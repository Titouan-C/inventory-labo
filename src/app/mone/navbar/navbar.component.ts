import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../auth/login/login.component';
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
    if (this.authService.getCurrentUser()) {
      const mail = this.authService.getMail();
      const password = this.authService.getPassword();
      if (mail && password) {
        this.login = this.authService.login(mail, password);
      } else {
        this.login = of(false);
      }
    } else {
      this.login = of(false);
    }
    console.log(this.authService.getCurrentUser());
  }
}
