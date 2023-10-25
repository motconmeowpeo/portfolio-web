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
  faSchool,
} from '@fortawesome/free-solid-svg-icons';
import { fromEvent } from 'rxjs';
import * as AOS from 'aos';
import {
  faAngular,
  faDocker,
  faReact,
} from '@fortawesome/free-brands-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { faHospital } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  readonly faMugHot = faMugHot;
  readonly faPaperPlane = faPaperPlane;
  readonly faSchool = faHospital;
  readonly faBrief = faBriefcase;
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    AOS.init({
      duration: 400,
      once: true,
      mirror: true,
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
}
