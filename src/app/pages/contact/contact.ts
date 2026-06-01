import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../core/data/site-content';
import { PageHero } from '../../shared/components/page-hero/page-hero';

@Component({
  selector: 'app-contact',
  imports: [PageHero, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly site = SITE;
}
