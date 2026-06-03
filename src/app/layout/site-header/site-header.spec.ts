import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteHeader } from './site-header';
import { NAV_LINKS } from '../../core/data/site-content';

describe('SiteHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('toggles menuOpen on toggleMenu()', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    const c = fixture.componentInstance as any;

    expect(c.menuOpen()).toBe(false);
    c.toggleMenu();
    expect(c.menuOpen()).toBe(true);
    c.toggleMenu();
    expect(c.menuOpen()).toBe(false);
  });

  it('closes menu on closeMenu()', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    const c = fixture.componentInstance as any;

    c.toggleMenu();
    expect(c.menuOpen()).toBe(true);
    c.closeMenu();
    expect(c.menuOpen()).toBe(false);
  });

  it('renders all navigation links plus the CTA button', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('nav a');
    expect(links.length).toBe(NAV_LINKS.length + 1);
  });
});
