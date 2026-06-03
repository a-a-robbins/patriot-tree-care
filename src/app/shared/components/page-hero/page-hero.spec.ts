import { TestBed } from '@angular/core/testing';
import { PageHero } from './page-hero';

describe('PageHero', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHero],
    }).compileComponents();
  });

  it('renders required title', () => {
    const fixture = TestBed.createComponent(PageHero);
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('Test Title');
  });

  it('shows eyebrow when provided', () => {
    const fixture = TestBed.createComponent(PageHero);
    fixture.componentRef.setInput('title', 'Title');
    fixture.componentRef.setInput('eyebrow', 'Eyebrow Text');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.page-hero__eyebrow');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('Eyebrow Text');
  });

  it('hides eyebrow when not provided', () => {
    const fixture = TestBed.createComponent(PageHero);
    fixture.componentRef.setInput('title', 'Title');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.page-hero__eyebrow')).toBeNull();
  });
});
