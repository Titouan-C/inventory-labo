import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

type User = {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  ecole: string;
  roles: Array<string>;
  password: string;
};

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    { id: 1, nom: 'nom1', prenom: 'prenom1', mail: 'mail1@ipi.fr', ecole: 'ipi-tstn1', roles: ['user', 'student'], password: 'pass1' },
    { id: 2, nom: 'nom2', prenom: 'prenom2', mail: 'mail2@ipi.fr', ecole: 'ipi-tstn2', roles: ['user', 'student'], password: 'pass2' },
    { id: 3, nom: 'nom3', prenom: 'prenom3', mail: 'mail3@ipi.fr', ecole: 'ipi-asrbd', roles: ['user', 'student'], password: 'pass3' },
  ];

  private currentUser: User | null = null;

  login(mail: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.mail === mail && u.password === password);
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

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  getMail(): string {
    let user = this.getCurrentUser();
    if (!user) {
      return "";
    } else {
      return user.mail;
    }
  }

  getPassword(): string {
    let user = this.getCurrentUser();
    if (!user) {
      return "";
    } else {
      return user.password;
    }
  }
}