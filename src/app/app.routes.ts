import { Routes } from '@angular/router';
import { SiteShell } from './layout/site-shell/site-shell';

export const routes: Routes = [
  {
    path: '',
    component: SiteShell,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
        title: 'Patriot Tree Care | Veteran-Owned Tree Service',
      },
      {
        path: 'services',
        loadComponent: () => import('./pages/services/services').then((m) => m.Services),
        title: 'Services | Patriot Tree Care',
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then((m) => m.About),
        title: 'About | Patriot Tree Care',
      },
      {
        path: 'gallery',
        loadComponent: () => import('./pages/gallery/gallery').then((m) => m.Gallery),
        title: 'Gallery | Patriot Tree Care',
      },
      {
        path: 'safety',
        loadComponent: () => import('./pages/safety/safety').then((m) => m.Safety),
        title: 'Safety & Insurance | Patriot Tree Care',
      },
      {
        path: 'faq',
        loadComponent: () => import('./pages/faq/faq').then((m) => m.Faq),
        title: 'FAQ | Patriot Tree Care',
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
        title: 'Contact | Patriot Tree Care',
      },
      {
        path: 'quote',
        loadComponent: () => import('./pages/quote/quote').then((m) => m.Quote),
        title: 'Free Quote | Patriot Tree Care',
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
