import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { IContact } from '@core/models';
const STORE_NAME = 'contact';

export const store = createStore(
    { name: STORE_NAME },
    withEntities<IContact>(),
    withActiveId()
);
