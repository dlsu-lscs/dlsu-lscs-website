import { Url } from 'next/dist/shared/lib/router/router';
import { UrlObject } from 'url';

export type partners = {
  name: string;
  logo: string;
  link: Url | string | UrlObject;
};
