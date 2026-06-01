import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_LINKS, SITE } from '../../core/data/site-content';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly site = SITE;
  protected readonly navLinks = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
