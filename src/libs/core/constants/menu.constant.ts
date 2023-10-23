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
    link: 'https://www.linkedin.com/in/nguyen-hien-nguyen-607197241/',
  },
  {
    icon: faGithub,
    link: 'https://github.com/HienNguyen120601',
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
