import { Component, Output, EventEmitter } from '@angular/core';
import { NewUser } from '../new-user.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mod-passe',
  templateUrl: './mod-passe.component.html',
  styleUrls: ['./mod-passe.component.css'],
})
export class ModPasseComponent {
  model: NewUser | null = null;
  @Output() emitUser: EventEmitter<NewUser> = new EventEmitter<NewUser>();

  Userform = this.fb.group(
    {
      Password: this.fb.control('', [Validators.required]),
      ConfirmPassword: this.fb.control('', [Validators.required]),
    },
    { updateOn: 'submit' }
  );

  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.submitted = false;

    if (this.model === null) {
      this.model = new NewUser();
    } else {
      // You may choose to update the form values here if needed
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.Userform.valid) {
      const newPassword = this.Userform.get('Password')?.value;
      const confirmPassword = this.Userform.get('ConfirmPassword')?.value;

      // Perform password validation
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
      this.Userform.patchValue({
        Password: '', // Reset password field
        ConfirmPassword: '', // Reset confirm password field
      });
    }
  }
}
