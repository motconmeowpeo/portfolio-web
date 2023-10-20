import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@core/components';
import {
  ButtonComponent,
  HorizontalComponent,
  SkillItemComponent,
} from '@core/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderComponent,
    ButtonComponent,
    FontAwesomeModule,
    HorizontalComponent,
    SkillItemComponent,
    FooterComponent,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
