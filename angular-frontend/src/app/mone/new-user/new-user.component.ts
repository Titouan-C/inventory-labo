import { Component, Input, Output } from '@angular/core';
import { NewUser } from '../new-user.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
})
export class NewUserComponent {
  @Input()
  model: NewUser | null = null;
  @Output()
  emitUser: EventEmitter<NewUser> = new EventEmitter<NewUser>();

  Userform = this.fb.group(
    {
      lastname: this.fb.control('', [Validators.required]),
      firstname: this.fb.control('', [Validators.required]),
      mail: this.fb.control('', [Validators.required]),
      ecole: this.fb.control(''),
      role: this.fb.control(''),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),
    },
    { updateOn: 'submit' }
  );
  submitted = false;
  
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.submitted = false;

    if (this.model === null) {
      this.model = new NewUser();
    } else {
      this.Userform.patchValue(this.model);
    }
  }
  onSubmit() {  
    this.submitted = true;

    if (this.Userform.valid) {
      const newPassword = this.Userform.get('Password')?.value;
      const confirmPassword = this.Userform.get('ConfirmPassword')?.value;

      if (newPassword === confirmPassword) {
        this.model = { ...this.model!, ...this.Userform.value };
        this.executeFetchRequest();
        this.emitUser.emit(this.model!);
        this.router.navigate(['/']);
      } else {
        console.log('Password and Confirm Password do not match.');
      }
    }
  }
  resetForm() {
    if (this.model !== null) {
      this.Userform.patchValue(this.model);
    }
  }

  executeFetchRequest() {
    const fetchLastname = this.Userform.get('lastname')?.value;
    const fetchFirstname = this.Userform.get('firstname')?.value;
    const fetchMail = this.Userform.get('mail')?.value;
    const fetchEcole = this.Userform.get('ecole')?.value;
    const fetchRole = this.Userform.get('role')?.value;
    const fetchPassword = this.Userform.get('password')?.value;

    const fetchRequest = `https://localhost:8000/execute-sql?type=INSERT&lastname=${fetchLastname}&firstname=${fetchFirstname}&mail=${fetchMail}&ecole=${fetchEcole}&role=${fetchRole}&password=${fetchPassword}`
    fetch(fetchRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .catch((error) => console.error('Erreur:', error));
  }
}
