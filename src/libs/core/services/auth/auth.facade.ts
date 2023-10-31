import {
  selectActiveEntity,
  selectAllEntities,
  setEntities,
  setActiveId,
  addEntities,
  deleteEntities,
} from '@ngneat/elf-entities';
import { Observable, filter, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './auth.store';
import { AuthService } from './auth.service';
import { IBaseParams } from '../../models/base.model';
import { IPost, IPostCommand } from '../../models/post.model';
import { IAuth, ILogin, IToken, IUser } from '@core/models';
import { select } from '@ngneat/elf';
import { data } from 'autoprefixer';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  accessToken$ = store.pipe(select((state) => state.accessToken));
  user$ = store.pipe(select((state) => state.user));
  constructor(private authService: AuthService) {}

  login(payload: Partial<ILogin>): Observable<IAuth> {
    return this.authService.login(payload).pipe(
      tap((token) => {
        this.update(token);
      })
    );
  }

  private update(data: Partial<IAuth>) {
    store.update((state) => ({
      ...state,
      ...data,
    }));
  }
}
