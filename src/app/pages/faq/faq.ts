import { Component, signal } from '@angular/core';
import { FAQ_ITEMS } from '../../core/data/site-content';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { PageHero } from '../../shared/components/page-hero/page-hero';

@Component({
  selector: 'app-faq',
  imports: [PageHero, CtaBanner],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  protected readonly items = FAQ_ITEMS;
  protected readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
