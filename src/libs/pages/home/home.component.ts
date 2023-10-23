import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faMugHot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { fromEvent } from 'rxjs';
import * as AOS from 'aos';
import {
  faAngular,
  faDocker,
  faReact,
} from '@fortawesome/free-brands-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  readonly faMugHot = faMugHot;
  readonly faPaperPlane = faPaperPlane;
  @ViewChild('skill') skill!: ElementRef<HTMLDivElement>;
  @ViewChild('message') message!: ElementRef<HTMLDivElement>;
  readonly SKILLS = [
    {
      name: 'Angular',
      desc: 'We build professional responsive websites optimized for the most popular search engines.',
      icon: 'angular.png',
      color: '#f60202',
    },

    {
      name: 'React',
      desc: 'We build professional responsive websites optimized for the most popular search engines.',
      icon: 'react.png',
      color: '#5ed3f3',
    },

    {
      name: 'NestJs',
      desc: 'We build professional responsive websites optimized for the most popular search engines.',
      icon: 'nestjs.svg',
      color: '#1d63ed',
    },
    {
      name: 'Docker',
      desc: 'We build professional responsive websites optimized for the most popular search engines.',
      icon: 'docker.png',
      color: '#1d63ed',
    },
    {
      name: 'Mongodb',
      desc: 'We build professional responsive websites optimized for the most popular search engines.',
      icon: 'mongodb.png',
      color: '#1d63ed',
    },
    {
      name: 'Postgres',
      desc: 'We build professional responsive websites optimized for the most popular search engines.',
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
