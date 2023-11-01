import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@core/services/auth';

export interface ILoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup<ILoginForm>;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formLogin = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });
  }

  submit() {
    this.authFacade.login(this.formLogin.value).subscribe();
  }
}
