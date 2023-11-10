import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from '../libs/pages/blogs/blogs.component';
import { LoginGuard } from '@pages/login';
import { PostDetailComponent } from '../libs/pages/post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  },
  {
    path: 'home',
    loadComponent: () => import('@pages/home').then((page) => page.HomeComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('@pages/blogs').then((page) => page.BlogsComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('@pages/post-detail').then((page) => page.PostDetailComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('@pages/login').then((page) => page.LoginComponent),
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'prefix',
  },
  {
    path: 'not-found',
    loadComponent: () => import('@pages/not-found').then((page) => page.NotFoundComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
