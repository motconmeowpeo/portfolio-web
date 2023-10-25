import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { IPost } from '@core/models';
const STORE_NAME = 'tours';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<IPost>(),
  withActiveId()
);
