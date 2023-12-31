import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpService } from '../http';
import { IBaseParams } from '@core/models';
import { HttpHeaders } from '@angular/common/http';
import { AuthFacade } from '../auth/auth.facade';
import { IContact, IContactCommand } from '@core/models';
import { environment } from 'src/environments/environment';

// export const API_CONTACT = 'https://portfolio-api-ten-vert.vercel.app/api/contact';
export const API_CONTACT = `${environment.apiUrl}/api/contact`;


@Injectable({ providedIn: 'root' })
export class ContactService {
    constructor(private http: HttpService, private authFacade: AuthFacade) { }

    getAll(params?: IBaseParams): Observable<IContact[]> {
        // return this.http.get<IHero[]>(API_URL);
        return this.authFacade.accessToken$.pipe(
            switchMap((token) => {
                const headers = new HttpHeaders({
                    Authorization: token!,
                });
                return this.http.get<IContact[]>(API_CONTACT, { params, headers });
            })
        );
    }

    create(payload: Partial<IContactCommand>): Observable<IContact> {

        return this.http.post<IContact>(`${API_CONTACT}`, payload);
    }

    update(id: string): Observable<IContact> {
        return this.authFacade.accessToken$.pipe(
            switchMap((token) => {
                const headers = new HttpHeaders({
                    Authorization: token!,
                });
                return this.http.put<IContact>(`${API_CONTACT}/${id}`, {}, { headers });
            })
        );
    }

    delete(id: string) {
        return this.authFacade.accessToken$.pipe(
            switchMap((token) => {
                const headers = new HttpHeaders({
                    Authorization: token!,
                });
                return this.http.post<IContact>(`${API_CONTACT}/delete`, { id }, { headers });
            })
        );
    }
}
