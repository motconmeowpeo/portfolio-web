import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './post-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';

const routes: Routes = [
  {
    path: '',
    component: PostDetailComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NzImageModule],
  declarations: [PostDetailComponent],
})
export class PostDetailModule {}
