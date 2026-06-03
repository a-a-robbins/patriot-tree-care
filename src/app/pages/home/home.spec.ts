import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';
import { SERVICES } from '../../core/data/site-content';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('exposes first 4 services', () => {
    const fixture = TestBed.createComponent(Home);
    const c = fixture.componentInstance as any;

    expect(c.services.length).toBe(4);
    expect(c.services).toEqual(SERVICES.slice(0, 4));
  });

  it('renders trust point cards', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.trust-card');
    expect(cards.length).toBe(4);
  });
});
