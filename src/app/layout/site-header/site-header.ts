import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_LINKS, SITE } from '../../core/data/site-content';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly site = SITE;
  protected readonly navLinks = NAV_LINKS;
  protected readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
