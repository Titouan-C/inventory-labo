import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewUser } from '../new-user.model';

@Injectable()
export class AuthService {
  private users: NewUser[] = [
    { id: 1, Nom: 'nom1', Prenom: 'prenom1', Mail: 'mail1@ipi.fr', Ecole: 'ipi-tstn1', Role: 'student', Password: 'pass1', ConfirmPassword: 'pass1' },
    { id: 2, Nom: 'nom2', Prenom: 'prenom2', Mail: 'mail2@ipi.fr', Ecole: 'ipi-tstn2', Role: 'student', Password: 'pass2', ConfirmPassword: 'pass2' },
    { id: 3, Nom: 'nom3', Prenom: 'prenom3', Mail: 'mail3@ipi.fr', Ecole: 'ipi-asrbd', Role: 'student', Password: 'pass3', ConfirmPassword: 'pass3' },
  ];

  private currentUser: NewUser | null = null;

  login(mail: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.Mail === mail && u.Password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): NewUser | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  getMail(): string | null {
    let user = this.getCurrentUser();
    if (!user) {
      return "";
    } else {
      return user.Mail;
    }
  }

  getPassword(): string | null {
    let user = this.getCurrentUser();
    if (!user) {
      return "";
    } else {
      return user.Password;
    }
  }

  updateCurrentUser(newUser: NewUser): void {
    const userIndex = this.users.findIndex(u => u.id === this.currentUser?.id);
    if (userIndex !== -1) {
      this.users[userIndex] = newUser;
    }
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  }
}