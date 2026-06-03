import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Faq } from './faq';
import { FAQ_ITEMS } from '../../core/data/site-content';

describe('Faq', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Faq],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('starts with first item open', () => {
    const fixture = TestBed.createComponent(Faq);
    expect((fixture.componentInstance as any).openIndex()).toBe(0);
  });

  it('collapses item when toggling the same index', () => {
    const fixture = TestBed.createComponent(Faq);
    const c = fixture.componentInstance as any;

    c.toggle(0);
    expect(c.openIndex()).toBeNull();
  });

  it('switches to a different item', () => {
    const fixture = TestBed.createComponent(Faq);
    const c = fixture.componentInstance as any;

    c.toggle(2);
    expect(c.openIndex()).toBe(2);
  });

  it('renders all FAQ items', () => {
    const fixture = TestBed.createComponent(Faq);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('.faq-item__trigger');
    expect(buttons.length).toBe(FAQ_ITEMS.length);
  });
});
