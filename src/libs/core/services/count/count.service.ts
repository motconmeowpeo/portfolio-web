import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { HttpService } from '../http';
import { environment } from 'src/environments/environment';
import { store } from './count.store';
import { selectAllEntities, setEntities } from '@ngneat/elf-entities';
import { select } from '@ngneat/elf';

// export const API_CONTACT = 'https://portfolio-api-ten-vert.vercel.app/api/contact';
export const API_COUNT = `${environment.apiUrl}/api/count`;


@Injectable({ providedIn: 'root' })
export class CountService {
    count$ = store.pipe(select((state) => {
        return state.count
    }),
    )
    constructor(private http: HttpService) { }

    getCount(): Observable<{ count: number }> {
        // return this.http.get<IHero[]>(API_URL);
        return this.http.get<{ count: number }>(API_COUNT).pipe(
            tap((count) => {
                store.update(() => {
                    return ({ activeId: 0, ...count })
                })
            })
        );
    }

    count(obj: Object): Observable<{ count: number }> {
        return this.http.put<{ count: number }>(`${API_COUNT}`, obj).pipe(
            tap(({ count }) => {
                if (count)
                    store.update((state) => ({ activeId: 0, count: count }))
            })
        );
    }


}
