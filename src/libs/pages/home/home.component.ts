import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  faBriefcase,
  faMugHot,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';

import { ActivatedRoute } from '@angular/router';
import { faHospital } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { FooterComponent, HeaderComponent, SkillItemComponent } from '@core/components';
import { ButtonComponent, HorizontalComponent } from '@core/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingSmallComponent } from '@core/components/loading-small';
import { ContactFacade } from '@core/services/contact';
import { catchError, tap } from 'rxjs';

export interface IContactForm {
  name: FormControl<string>,
  email: FormControl<string>,
  phone: FormControl<string>,
  message: FormControl<string>,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    FontAwesomeModule,
    HorizontalComponent,
    SkillItemComponent,
    FooterComponent,
    ReactiveFormsModule,
    LoadingSmallComponent
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {
  readonly faMugHot = faMugHot;
  readonly faPaperPlane = faPaperPlane;
  readonly faSchool = faHospital;
  readonly faBrief = faBriefcase;
  isLoading = false;
  form!: FormGroup<IContactForm>
  @ViewChild('skill') skill!: ElementRef<HTMLDivElement>;
  @ViewChild('message') message!: ElementRef<HTMLDivElement>;
  readonly SKILLS = [
    {
      name: 'Angular',
      desc: 'I build professional responsive websites optimized for the most popular search engines.',
      icon: 'angular.png',
      color: '#f60202',
    },

    {
      name: 'React',
      desc: 'I build professional responsive websites optimized for the most popular search engines.',
      icon: 'react.png',
      color: '#5ed3f3',
    },

    {
      name: 'NestJs',
      desc: 'I build professional responsive websites optimized for the most popular search engines.',
      icon: 'nestjs.svg',
      color: '#1d63ed',
    },
    {
      name: 'Docker',
      desc: 'I build professional responsive websites optimized for the most popular search engines.',
      icon: 'docker.png',
      color: '#1d63ed',
    },
    {
      name: 'Mongodb',
      desc: 'I build professional responsive websites optimized for the most popular search engines.',
      icon: 'mongodb.png',
      color: '#1d63ed',
    },
    {
      name: 'Postgres',
      desc: 'I build professional responsive websites optimized for the most popular search engines.',
      icon: 'postgres.png',
      color: '#1d63ed',
    },
  ];

  constructor(private route: ActivatedRoute, private contactFacade: ContactFacade) { }

  ngOnInit() {
    AOS.init({
      duration: 400,
      once: true,
      mirror: true,
    });

    this.form = new FormGroup({
      email: new FormControl('', { nonNullable: true, validators: [Validators.email, Validators.required] }),
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)] }),
      message: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      phone: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    })
  }
  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['goto']) {
        this.message.nativeElement.scrollIntoView(true);
      }
    });
  }

  gotoSkills() {
    this.skill.nativeElement.scrollIntoView(true);
  }

  gotoSendMessage() {
    this.message.nativeElement.scrollIntoView(true);
  }

  submitContact() {
    this.isLoading = true
    this.contactFacade.create(this.form.value).pipe(tap(() => {
      this.isLoading = false
      this.form.reset()
    }), catchError((err) => err)).subscribe()
  }
}
