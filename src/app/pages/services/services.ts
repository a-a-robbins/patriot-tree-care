import { Component } from '@angular/core';
import { SERVICES } from '../../core/data/site-content';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { PageHero } from '../../shared/components/page-hero/page-hero';

@Component({
  selector: 'app-services',
  imports: [PageHero, CtaBanner],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly services = SERVICES;
}
