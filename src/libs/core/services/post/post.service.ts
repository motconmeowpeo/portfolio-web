import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http';
import { IBaseParams } from '../../models/base.model';
import { IPost, IPostCommand } from '../../models/post.model';

export const API_POST = 'https://portfolio-api-ten-vert.vercel.app/api/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpService) {}

  getAll(params?: IBaseParams): Observable<IPost[]> {
    // return this.http.get<IHero[]>(API_URL);
    return this.http.get<IPost[]>(API_POST, { params });
  }

  getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${API_POST}/${id}`);
  }

  create(payload: Partial<IPostCommand>): Observable<IPost> {
    return this.http.post<IPost>(`${API_POST}`, payload);
  }

  delete(id: string) {
    return this.http.post<IPost>(`${API_POST}/delete`, { id });
  }
}
