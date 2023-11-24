import { createStore, withProps } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { IPost } from '@core/models';
const STORE_NAME = 'count';

export const store = createStore(
    { name: STORE_NAME },
    withProps<{ count: number }>({
        count: 0
    }),
    withActiveId()
);
