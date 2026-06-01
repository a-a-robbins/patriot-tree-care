import { Component } from '@angular/core';
import { GALLERY_ITEMS } from '../../core/data/site-content';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { PageHero } from '../../shared/components/page-hero/page-hero';

@Component({
  selector: 'app-gallery',
  imports: [PageHero, CtaBanner],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  protected readonly items = GALLERY_ITEMS;
}
