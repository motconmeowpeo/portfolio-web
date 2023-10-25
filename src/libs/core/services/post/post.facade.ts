import {
  selectActiveEntity,
  selectAllEntities,
  setEntities,
  setActiveId,
  addEntities,
  deleteEntities,
} from '@ngneat/elf-entities';
import { filter, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './post.store';
import { PostService } from './post.service';
import { IBaseParams } from '../../models/base.model';
import { IPost, IPostCommand } from '../../models/post.model';

const MOCK_POST: IPost[] = [
  {
    id: '1',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    title: 'New post',
    createAt: '21-20-2000',
    createBy: {
      id: '1',
      active: true,
      username: 'user1',
      email: 'hi@cc.gg',
    },
  },
  {
    id: '1',
    description: 'Hello',
    title: 'New post',
    createAt: '20-20-2000',
    createBy: {
      id: '1',
      active: true,
      username: 'user1',
      email: 'hi@cc.gg',
    },
  },
  {
    id: '1',
    description: 'Hello',
    title: 'New post',
    createAt: '20-20-2000',
    createBy: {
      id: '1',
      active: true,
      username: 'user1',
      email: 'hi@cc.gg',
    },
  },
  {
    id: '1',
    description: 'Hello',
    title: 'New post',
    createAt: '20-20-2000',
    createBy: {
      id: '1',
      active: true,
      username: 'user1',
      email: 'hi@cc.gg',
    },
  },
  {
    id: '1',
    description: 'Hello',
    title: 'New post',
    createAt: '20-20-2000',
    createBy: {
      id: '1',
      active: true,
      username: 'user1',
      email: 'hi@cc.gg',
    },
  },
  {
    id: '1',
    description: 'Hello',
    title: 'New post',
    createAt: '20-20-2000',
    createBy: {
      id: '1',
      active: true,
      username: 'user1',
      email: 'hi@cc.gg',
    },
  },
  {
    id: '1',
    description: 'Hello',
    title: 'New post',
    createAt: '20-20-2000',
    createBy: {
      id: '1',
      active: true,
      username: 'user1',
      email: 'hi@cc.gg',
    },
  },
  {
    id: '1',
    description: 'Hello',
    title: 'New post',
    createAt: '20-20-2000',
    createBy: {
      id: '1',
      active: true,
      username: 'user1',
      email: 'hi@cc.gg',
    },
  },
];

@Injectable({ providedIn: 'root' })
export class PostFacade {
  posts$ = store.pipe(selectAllEntities());
  post$ = store.pipe(
    selectActiveEntity(),
    filter((post) => !!post)
  );
  constructor(private postService: PostService) {}
  getAll(params?: IBaseParams) {
    return of(MOCK_POST);
    // .pipe(
    //   tap((posts) => {
    //     store.destroy();
    //     store.update(setEntities(posts));
    //   })
    // );
    return this.postService.getAll(params).pipe(
      tap((posts) => {
        store.update(setEntities(posts));
      })
    );
  }

  getPostById(id: string) {
    return this.postService.getPostById(id).pipe(
      tap((post) => {
        store.update(setEntities([post]));
        store.update(setActiveId(post.id));
      })
    );
  }

  create(payload: Partial<IPostCommand>) {
    return this.postService.create(payload).pipe(
      tap((post) => {
        store.update(addEntities(post));
        store.update(setActiveId(post.id));
      })
    );
  }

  delete(id: string) {
    return this.postService
      .delete(id)
      .pipe(tap((post) => store.update(deleteEntities(post.id))));
  }
}
