import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooter],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('shows current year', () => {
    const fixture = TestBed.createComponent(SiteFooter);
    const currentYear = new Date().getFullYear();
    expect((fixture.componentInstance as any).year).toBe(currentYear);
  });

  it('renders navigation links', () => {
    const fixture = TestBed.createComponent(SiteFooter);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('li a');
    expect(links.length).toBeGreaterThan(0);
  });
});
