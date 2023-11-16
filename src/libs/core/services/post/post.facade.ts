import {
  selectActiveEntity,
  selectAllEntities,
  setEntities,
  setActiveId,
  addEntities,
  deleteEntities,
  updateEntities,
} from '@ngneat/elf-entities';
import { filter, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './post.store';
import { PostService } from './post.service';
import { IPost, ICreatePostCommand, IBaseParams, IUpdatePostCommand } from '@core/models';

@Injectable({ providedIn: 'root' })
export class PostFacade {
  posts$ = store.pipe(selectAllEntities());
  post$ = store.pipe(
    selectActiveEntity(),
    filter((post) => !!post)
  );
  constructor(private postService: PostService) { }
  getAll(params?: IBaseParams) {
    return this.postService.getAll(params).pipe(
      tap((posts) => {
        const postsMappingId = posts.map((post) => ({ ...post, id: post._id }));
        store.update(setEntities(postsMappingId));
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

  create(payload: Partial<ICreatePostCommand>) {
    return this.postService.create(payload).pipe(
      tap((post) => {
        const postMappingId = { ...post, id: post._id };
        store.update(addEntities(postMappingId, { prepend: true }));
        store.update(setActiveId(postMappingId.id));
      })
    );
  }

  update(payload: Partial<IUpdatePostCommand>) {
    return this.postService.update(payload).pipe(
      tap((post) => {
        const postMappingId = { ...post, id: post._id };
        store.update(updateEntities(postMappingId.id, postMappingId));
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
