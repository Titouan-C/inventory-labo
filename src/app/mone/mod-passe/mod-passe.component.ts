import { Component, Input, Output } from '@angular/core';
import { NewUser } from '../new-user.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-mod-passe',
  templateUrl: './mod-passe.component.html',
  styleUrl: './mod-passe.component.css',
})
export class ModPasseComponent {
  model: NewUser | null = null;
  @Output()
  emitUser: EventEmitter<NewUser> = new EventEmitter<NewUser>();

  Userform = this.fb.group(
    {
      Password: this.fb.control('', [Validators.required]),
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
      this.Userform.patchValue(this.model);
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.Userform.valid) {
      this.model = { ...this.model!, ...this.Userform.value };
      this.emitUser.emit(this.model!);
    }
    console.log(this.model);
  }
  resetForm() {
    if (this.model !== null) {
      this.Userform.patchValue(this.model);
    }
  }
}
