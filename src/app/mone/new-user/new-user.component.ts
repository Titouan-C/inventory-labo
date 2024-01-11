import { Component, Input, Output } from '@angular/core';
import { NewUser } from '../new-user.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

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
      Nom: this.fb.control('', [Validators.required]),
      Prenom: this.fb.control('', [Validators.required]),
      Mail: this.fb.control('', [Validators.required]),
      Ecole: this.fb.control(''),
      Role: this.fb.control(''),
      Password: this.fb.control('', [Validators.required]),
      ConfirmPassword: this.fb.control('', [Validators.required]),
    },
    { updateOn: 'submit' }
  );
  submitted = false;
  constructor(private fb: FormBuilder) { }

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
        this.emitUser.emit(this.model!);
      } else {
        console.log('Password and Confirm Password do not match.');
      }
    }
    console.log(this.model);
  }
  resetForm() {
    if (this.model !== null) {
      this.Userform.patchValue(this.model);
    }
  }
}
