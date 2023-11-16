import { Observable, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './auth.store';
import { AuthService } from './auth.service';
import { IAuth, ILogin } from '@core/models';
import { select } from '@ngneat/elf';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  accessToken$ = store.pipe(select((state) => state.accessToken));
  user$ = store.pipe(select((state) => state.user));
  constructor(private authService: AuthService) { }

  login(payload: Partial<ILogin>): Observable<IAuth> {
    return this.authService.login(payload).pipe(
      tap((token) => {
        this.update(token);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.accessToken$.pipe(
      map((accessToken) => {
        return !!accessToken && !this.authService.isTokenExpired(accessToken);
      })
    );
  }

  isTokenExpired(token: string): boolean {
    return this.authService.isTokenExpired(token);
  }

  private update(data: Partial<IAuth>) {
    store.update((state) => ({
      ...state,
      ...data,
    }));
  }

  logOut() {
    store.reset()
  }
}
