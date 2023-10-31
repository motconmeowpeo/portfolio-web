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

@Injectable({ providedIn: 'root' })
export class PostFacade {
  posts$ = store.pipe(selectAllEntities());
  post$ = store.pipe(
    selectActiveEntity(),
    filter((post) => !!post)
  );
  constructor(private postService: PostService) {}
  getAll(params?: IBaseParams) {
    return this.postService.getAll(params).pipe(
      tap((posts) => {
        const postMappingId = posts.map((post) => ({ ...post, id: post._id }));
        store.update(setEntities(postMappingId));
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
        const postMappingId = { ...post, id: post._id };
        store.update(addEntities(postMappingId, { prepend: true }));
        store.update(setActiveId(postMappingId.id));
      })
    );
  }

  delete(id: string) {
    return this.postService
      .delete(id)
      .pipe(tap((post) => store.update(deleteEntities(id))));
  }
}
