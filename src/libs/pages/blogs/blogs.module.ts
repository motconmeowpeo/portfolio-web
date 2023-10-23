import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from '@core/components';
import { NzImageModule } from 'ng-zorro-antd/image';

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FooterComponent,
    NzImageModule,
  ],
  declarations: [BlogsComponent],
})
export class BlogsModule {}
