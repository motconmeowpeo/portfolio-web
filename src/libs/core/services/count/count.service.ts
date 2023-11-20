import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http';
import { environment } from 'src/environments/environment';

// export const API_CONTACT = 'https://portfolio-api-ten-vert.vercel.app/api/contact';
export const API_COUNT = `${environment.apiUrl}/api/count`;


@Injectable({ providedIn: 'root' })
export class CountService {
    constructor(private http: HttpService) { }

    getCount(): Observable<{ count: number }> {
        // return this.http.get<IHero[]>(API_URL);
        return this.http.get<{ count: number }>(API_COUNT);
    }

    count(): Observable<{ count: number }> {

        return this.http.post<{ count: number }>(`${API_COUNT}`, {});
    }


}
