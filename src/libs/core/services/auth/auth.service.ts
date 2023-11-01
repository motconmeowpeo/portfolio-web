import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from '../http';
import { IUser, ILogin, IToken, IAuth } from '@core/models';
import { JwtHelperService } from '@auth0/angular-jwt';

export const API_AUTH = 'https://portfolio-api-ten-vert.vercel.app/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpService,
    private jwtService: JwtHelperService
  ) {}

  login(payload: Partial<ILogin>): Observable<IAuth> {
    return this.http
      .post<IToken>(`${API_AUTH}/login`, payload)
      .pipe(map((token) => this.authenticate(token)));
  }

  isTokenExpired(token: string): boolean {
    return this.jwtService.isTokenExpired(token);
  }

  private authenticate(authToken: IToken): IAuth {
    return {
      ...authToken,
      user: this.jwtService.decodeToken(String(authToken.accessToken)),
    };
  }
}
