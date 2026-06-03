import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CtaBanner } from './cta-banner';

describe('CtaBanner', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaBanner],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders default heading and button text', () => {
    const fixture = TestBed.createComponent(CtaBanner);
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2');
    const link = fixture.nativeElement.querySelector('a');
    expect(h2.textContent).toContain('Ready for a free quote');
    expect(link.textContent).toContain('Get a free quote');
  });

  it('renders custom input values', () => {
    const fixture = TestBed.createComponent(CtaBanner);
    fixture.componentRef.setInput('heading', 'Custom Heading');
    fixture.componentRef.setInput('buttonLabel', 'Custom Button');
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2');
    const link = fixture.nativeElement.querySelector('a');
    expect(h2.textContent).toContain('Custom Heading');
    expect(link.textContent).toContain('Custom Button');
  });

  it('renders an anchor with routerLink bound to buttonLink', () => {
    const fixture = TestBed.createComponent(CtaBanner);
    fixture.componentRef.setInput('buttonLink', '/custom');
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/custom');
  });
});
