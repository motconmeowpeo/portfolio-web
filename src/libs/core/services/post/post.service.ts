import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpService } from '../http';
import { IPost, ICreatePostCommand, IBaseParams, IUpdatePostCommand } from '@core/models';
import { HttpHeaders } from '@angular/common/http';
import { AuthFacade } from '../auth/auth.facade';
import { environment } from 'src/environments/environment';

export const API_POST = `${environment.apiUrl}/api/post`;

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpService, private authFacade: AuthFacade) { }

  getAll(params?: IBaseParams): Observable<IPost[]> {
    // return this.http.get<IHero[]>(API_URL);
    return this.http.get<IPost[]>(API_POST, { params });
  }

  getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${API_POST}/${id}`);
  }

  create(payload: Partial<ICreatePostCommand>): Observable<IPost> {
    return this.authFacade.accessToken$.pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: token!,
        });
        return this.http.post<IPost>(`${API_POST}`, payload, { headers });
      })
    );
  }

  update(payload: Partial<IUpdatePostCommand>): Observable<IPost> {
    return this.authFacade.accessToken$.pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: token!,
        });
        return this.http.put<IPost>(`${API_POST}/${payload.id}`, payload, { headers });
      })
    );
  }

  delete(id: string) {
    return this.authFacade.accessToken$.pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: token!,
        });
        return this.http.post<IPost>(`${API_POST}/delete`, { id }, { headers });
      })
    );
  }
}
