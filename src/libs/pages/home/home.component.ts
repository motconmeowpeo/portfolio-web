import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faMugHot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { fromEvent } from 'rxjs';
import * as AOS from 'aos';
import {
  faAngular,
  faDocker,
  faReact,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  readonly faMugHot = faMugHot;
  readonly faPaperPlane = faPaperPlane;
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
  constructor() {}

  ngOnInit() {
    AOS.init({
      duration: 400,
      once: true,
      mirror: true,
    });
  }
}
