import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthFacade } from '@core/services/auth';
import { catchError, of } from 'rxjs';

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
  isLoading = false
  constructor(private authFacade: AuthFacade, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formLogin = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
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
    this.isLoading = true
    this.authFacade.login(this.formLogin.value)
      .pipe(
        catchError(er => {
          this.isLoading = false;
          return of(er)
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home'])
      });

  }
}
