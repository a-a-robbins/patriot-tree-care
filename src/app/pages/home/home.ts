import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES, SITE, TRUST_POINTS } from '../../core/data/site-content';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CtaBanner],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly site = SITE;
  protected readonly services = SERVICES.slice(0, 4);
  protected readonly trustPoints = TRUST_POINTS;
}
