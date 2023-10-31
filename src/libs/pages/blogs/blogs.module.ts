import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent, PostItemComponent } from '@core/components';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ButtonComponent } from '@core/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoadingComponent } from '@core/components/loading';

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
    NzPaginationModule,
    PostItemComponent,
    NzImageModule,
    RouterModule,
    ButtonComponent,
    FontAwesomeModule,
    LoadingComponent,
  ],
  declarations: [BlogsComponent],
})
export class BlogsModule {}
