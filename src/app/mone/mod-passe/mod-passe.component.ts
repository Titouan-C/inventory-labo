import { Component, Output, EventEmitter } from '@angular/core';
import { NewUser } from '../new-user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.submitted = false;

    if (this.model === null) {
      this.model = new NewUser();
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
        this.router.navigate(['/']);
      } else {
        alert('Password and Confirm Password do not match.');
      }
    }
    console.log(this.model);
  }

  resetForm() {
    if (this.model !== null) {
      this.Userform.patchValue({
        Password: '',
        ConfirmPassword: '',
      });
    }
  }
}
