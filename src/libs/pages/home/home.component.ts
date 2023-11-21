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
import {
  ExpItemComponent,
  FooterComponent,
  HeaderComponent,
  SkillItemComponent,
} from '@core/components';
import { ButtonComponent, HorizontalComponent } from '@core/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingSmallComponent } from '@core/components/loading-small';
import { ContactFacade } from '@core/services/contact';
import { catchError, tap } from 'rxjs';
import { inputFieldOnlyNumber } from '@core/until';
import { CE_ITEMS, EXP_ITEMS, PROJECT_ITEMS, SKILLS } from '@core/constants';
import { ProjectItemComponent } from '@core/components/project-item';

export interface IContactForm {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  message: FormControl<string>;
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
    LoadingSmallComponent,
    ExpItemComponent,
    ProjectItemComponent,
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('skill') skill!: ElementRef<HTMLDivElement>;
  @ViewChild('message') message!: ElementRef<HTMLDivElement>;
  readonly SKILLS = SKILLS;
  readonly EXP_ITEMS = EXP_ITEMS;
  readonly PROJECT_ITEMS = PROJECT_ITEMS;
  readonly CE_ITEMS = CE_ITEMS;
  readonly NAME = [
    {
      text: 'I',
      delay: 1
    },
    {
      text: "'m",
      delay: 2
    },
    {
      text: ' N',
      delay: 3
    },
    {
      text: 'i',
      delay: 4
    },
    {
      text: 'k',
      delay: 5
    },
    {
      text: 'a.',
      delay: 6
    },
  ];
  readonly faMugHot = faMugHot;
  readonly faPaperPlane = faPaperPlane;
  readonly faSchool = faHospital;
  readonly faBrief = faBriefcase;
  isLoading = false;
  form!: FormGroup<IContactForm>;

  constructor(
    private route: ActivatedRoute,
    private contactFacade: ContactFacade
  ) { }

  ngOnInit() {
    AOS.init({
      duration: 400,
      once: true,
      mirror: true,
    });

    this.form = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.email, Validators.required],
      }),
      name: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s]+$/),
          Validators.maxLength(20),
        ],
      }),
      message: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(300)],
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.max(9999999999)],
      }),
    });
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
    this.isLoading = true;
    this.contactFacade
      .create(this.form.value)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.form.reset();
        }),
        catchError((err) => err)
      )
      .subscribe();
  }

  keyPressOnlyNumber(event: any) {
    const checkNotNumber = inputFieldOnlyNumber(event);
    if (checkNotNumber) {
      event.preventDefault();
    }
  }
}
