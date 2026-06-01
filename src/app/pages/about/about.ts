import { Component } from '@angular/core';
import { SITE } from '../../core/data/site-content';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { PageHero } from '../../shared/components/page-hero/page-hero';

@Component({
  selector: 'app-about',
  imports: [PageHero, CtaBanner],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly site = SITE;
}
