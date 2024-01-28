import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { NewUser } from '../new-user.model';

@Injectable()
export class AuthService {

  private currentUser: NewUser | null = null;

  constructor(@Inject(DOCUMENT) private document: Document) { }

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

  updateUser(user: NewUser): void {
    this.currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
}