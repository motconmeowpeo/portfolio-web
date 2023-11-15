import {
    selectActiveEntity,
    selectAllEntities,
    setEntities,
    setActiveId,
    addEntities,
    deleteEntities,
    updateEntities,
} from '@ngneat/elf-entities';
import { Observable, filter, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './contact.store';
import { ContactService } from './contact.service';
import { IBaseParams } from '../../models/base.model';
import { IContact, IContactCommand } from '@core/models';

@Injectable({ providedIn: 'root' })
export class ContactFacade {
    contacts$ = store.pipe(selectAllEntities());
    contact$ = store.pipe(
        selectActiveEntity(),
        filter((contact) => !!contact)
    );
    constructor(private contactService: ContactService) { }
    getAll(params?: IBaseParams) {
        return this.contactService.getAll(params).pipe(
            tap((posts) => {
                const contactsMappingId = posts.map((post) => ({ ...post, id: post._id }));
                store.update(setEntities(contactsMappingId));
            })
        );
    }

    create(payload: Partial<IContactCommand>) {
        return this.contactService.create(payload).pipe(
            tap((post) => {
                const contactMappingId = { ...post, id: post._id };
                store.update(addEntities(contactMappingId, { prepend: true }));
                store.update(setActiveId(contactMappingId.id));
            })
        );
    }

    delete(id: string) {
        return this.contactService
            .delete(id)
            .pipe(tap((post) => store.update(deleteEntities(id))));
    }

    update(id: string): Observable<IContact> {
        return this.contactService.update(id).pipe(
            tap((post) => {
                const contactMappingId = { ...post, id: post._id };
                store.update(updateEntities(contactMappingId._id, contactMappingId));
                store.update(setActiveId(contactMappingId._id));
            })
        );
    }
}
