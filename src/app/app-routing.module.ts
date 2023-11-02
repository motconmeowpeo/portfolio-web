import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  },
  {
    path: 'home',
    loadChildren: () => import('@pages/home').then((page) => page.HomeModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('@pages/blogs').then((page) => page.BlogsModule),
  },
  {
    path: 'post/:id',
    loadChildren: () =>
      import('@pages/post-detail').then((page) => page.PostDetailModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('@pages/login').then((page) => page.LoginModule),
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'prefix',
  },
  {
    path: 'not-found',
    loadChildren: () => import('@pages/not-found').then((page) => page.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
