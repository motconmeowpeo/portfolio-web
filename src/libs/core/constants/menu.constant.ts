import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

export const NAV_ICON = [
  {
    icon: faFacebook,
    link: 'https://www.facebook.com/nguyen.nhok.94043/?locale=vi_VN',
  },
  { icon: faInstagram, link: 'https://www.instagram.com/hien.nguyenxd/' },
  {
    icon: faLinkedin,
    link: 'https://www.linkedin.com/in/nguyen-hien-nguyen/',
  },
  {
    icon: faGithub,
    link: 'https://github.com/motconmeowpeo',
  },
];

export const SKILLS = [
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

export const NAV_MENU = [
  { name: 'Home', path: '/home' },
  { name: 'Blog', path: '/blog' },
];

export const GET_IN_TOUCH = [
  { icon: faPhone, text: '+84334829504' },
  { icon: faEnvelope, text: 'nika.n@itcgroup.io' },
  { icon: faLocationDot, text: 'Tân Bình' },
];

export const OUR_SERVICES = [
  'Website Development',
  'Building Application',
  'SEO & Digital Marketing',
  'Branding and  Identify',
  'Solution',
];

export const POPULAR_TAGS = [
  'Web',
  'Development',
  'Technology',
  'Education',
  'Health',
  'Industry',
];

export const EXP_ITEMS = [
  {
    label: 'Saigon Technology University',
    time: '2019 - 2023',
    content: 'Information Technology',
    desc: 'General knowledge about Programming',
    logo: 'stu.png'
  },
  {
    label: 'ITC Group',
    time: 'Feb 2023 - June 2023',
    content: 'Internship',
    desc: 'Learn language and framework. Join projects to practice',
    logo: 'itcgroup.png'

  },
  {
    label: 'ITC Group',
    time: 'June 2023 - Now',
    content: 'Software Engineer',
    desc: 'Be a software engineer. Join projects',
    logo: 'itcgroup.png'
  },
]

export const PROJECT_ITEMS = [
  {
    label: 'iWorkspace',
    desc: 'Optimize all your business growth resources with innovative Human Resources Management, Automation Workflow, and Task Management features in one place.',
    position: ['Frontend Developer', 'Backend Developer'],
    logo: 'iworkspace.svg',
    link: 'https://iworkspace.io/'
  },
  {
    label: 'Fiona',
    desc: 'A specialized social networking site that bridges the gap between enterprises and influential personalities. This platform serves as a nexus, facilitating collaborations and partnerships between businesses seeking exposure and KOLs seeking authentic engagement.',
    position: ['Frontend Developer'],
    logo: 'fiona.svg',
    link: ''

  },

  {
    label: 'Trippy',
    desc: 'A website serves as a comprehensive support system for tour operators, facilitating seamless tour sales and enabling users to book their dream adventures hassle-free',
    position: ['Frontend Developer', 'Backend Developer'],
    logo: 'trippy.svg',
    link: 'https://trippy-mu.vercel.app/'
  },

]

export const CE_ITEMS = [
  {
    label: 'Angular Basic',
    logo: 'hackerrank.png',
    link: 'https://www.hackerrank.com/certificates/85f4abb9fb74'
  },
  {
    label: 'Javascript Basic',
    logo: 'hackerrank.png',
    link: 'https://www.hackerrank.com/certificates/4cfe1902c33c'
  },

  {
    label: 'JavaScript Intermediate',
    logo: 'hackerrank.png',
    link: 'https://www.hackerrank.com/certificates/bd7234cddc67'
  },
  {
    label: 'CSS Basic',
    logo: 'hackerrank.png',
    link: 'https://www.hackerrank.com/certificates/7b0b9a62bb27'
  },
]
