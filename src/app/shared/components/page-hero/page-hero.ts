import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  templateUrl: './page-hero.html',
  styleUrl: './page-hero.scss',
})
export class PageHero {
  readonly eyebrow = input<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
