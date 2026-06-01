import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-banner',
  imports: [RouterLink],
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.scss',
})
export class CtaBanner {
  readonly heading = input('Ready for a free quote?');
  readonly subtext = input('Tell us about your trees — we respond within one business day.');
  readonly buttonLabel = input('Get a free quote');
  readonly buttonLink = input('/quote');
}
