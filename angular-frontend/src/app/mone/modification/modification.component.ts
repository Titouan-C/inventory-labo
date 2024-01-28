import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NewUser } from '../new-user.model';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css'],
})
export class ModificationComponent implements OnInit {
  
  private boolPassword = false;

  Userform = this.fb.group({
    lastname: this.fb.control('', [
      Validators.required,
    ]),
    firstname: this.fb.control('', [
      Validators.required,
    ]),
    mail: this.fb.control('', [
      Validators.required,
    ]),
    ecole: this.fb.control('', [
      Validators.required,
    ]),
    role: this.fb.control('', [
      Validators.required,
    ]),
    password: this.fb.control('', [
      Validators.required,
    ]),
    confirmPassword: this.fb.control('', [
      Validators.required,
    ]),
  });

  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.submitted = false;
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.executeFetchUpdateGetRequest();
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.Userform.valid) {
      const password = this.Userform.get('password')?.value;
      const confirmPassword = this.Userform.get('confirmPassword')?.value;
      if (password === confirmPassword) {
        this.executeFetchVerifyGetRequest()
      } else {
        alert('Password and Confirm Password do not match.');
      }
    }
  }

  executeFetchUpdatePostRequest() {
    const currentUser = this.authService.getCurrentUser();

    const fetchLastname = this.Userform.get('lastname')?.value;
    const fetchFirstname = this.Userform.get('firstname')?.value;
    const fetchMail = this.Userform.get('mail')?.value;
    const fetchEcole = this.Userform.get('ecole')?.value;
    const fetchRole = this.Userform.get('role')?.value;

    const fetchWhere = currentUser?.mail;

    const fetchRequest = `https://localhost:8000/execute-sql?type=UPDATE&where=${fetchWhere}&lastname=${fetchLastname}&firstname=${fetchFirstname}&mail=${fetchMail}&ecole=${fetchEcole}&role=${fetchRole}`
    fetch(fetchRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .catch((error) => console.error('Erreur:', error));
  }
  
  executeFetchVerifyGetRequest() {
    const fetchRequestMail = this.authService.getCurrentUser()?.mail;
    const fetchRequestPassword = this.Userform.get('password')?.value;

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
            const formValues = this.Userform.getRawValue();
            const updatedData = new NewUser(formValues.mail!);
            this.executeFetchUpdatePostRequest();
            this.authService.updateUser(updatedData);
            alert('User updated:' + this.authService.getCurrentUser());
            this.router.navigate(['/']);
          } else {
            alert('sas not match.');
          }
      })
      .catch(error => {
          console.error('Erreur lors de la requête :', error);
          throw error;
      });
  }

  executeFetchUpdateGetRequest() {
    const currentUserMail = this.authService.getCurrentUser()?.mail;

    fetch(`https://localhost:8000/export-json?type=UPDATEUSER&mail=${currentUserMail}`, {
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
        this.Userform.patchValue({
          mail: currentUserMail,
          ...data,
        });
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
        throw error;
      });
  }

}
