import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpService } from '../http';
import { IBaseParams } from '../../models/base.model';
import { IPost, IPostCommand } from '../../models/post.model';
import { HttpHeaders } from '@angular/common/http';
import { AuthFacade } from '../auth/auth.facade';

export const API_POST = 'https://portfolio-api-ten-vert.vercel.app/api/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpService, private authFacade: AuthFacade) {}

  getAll(params?: IBaseParams): Observable<IPost[]> {
    // return this.http.get<IHero[]>(API_URL);
    return this.http.get<IPost[]>(API_POST, { params });
  }

  getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${API_POST}/${id}`);
  }

  create(payload: Partial<IPostCommand>): Observable<IPost> {
    return this.authFacade.accessToken$.pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: token!,
        });
        return this.http.post<IPost>(`${API_POST}`, payload, { headers });
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
