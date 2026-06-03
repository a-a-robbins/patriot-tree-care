import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Quote } from './quote';
import { QuoteApiService } from '../../core/services/quote-api.service';

function addressValue() {
  return {
    address1: '123 Main St',
    address2: '',
    city: 'Springfield',
    state: 'IL',
    zipcode: '62701',
  };
}

function validPayload() {
  return {
    name: 'John',
    email: 'john@test.com',
    phone: '555-1234',
    address: addressValue(),
    serviceType: 'removal',
    preferredDate: '',
    message: '',
  };
}

function flattenedAddress() {
  return '123 Main St, Springfield, IL 62701';
}

describe('Quote', () => {
  let quoteApiMock: { submitQuote: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    quoteApiMock = { submitQuote: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Quote],
      providers: [{ provide: QuoteApiService, useValue: quoteApiMock }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Quote);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('does not submit when form is invalid and marks fields touched', () => {
    const fixture = TestBed.createComponent(Quote);
    const c = fixture.componentInstance as any;

    const markTouched = vi.spyOn(c.form, 'markAllAsTouched');
    c.submit();

    expect(c.quoteApi.submitQuote).not.toHaveBeenCalled();
    expect(markTouched).toHaveBeenCalled();
    expect(c.success()).toBe(false);
  });

  it('does not call API when honeypot is filled', () => {
    const fixture = TestBed.createComponent(Quote);
    const c = fixture.componentInstance as any;

    c.form.patchValue({ ...validPayload(), website: 'bot' });
    c.submit();

    expect(c.quoteApi.submitQuote).not.toHaveBeenCalled();
    expect(c.success()).toBe(true);
  });

  it('calls API with flattened address and optional message omitted', () => {
    const fixture = TestBed.createComponent(Quote);
    const c = fixture.componentInstance as any;

    c.quoteApi.submitQuote.mockReturnValue(of({ ok: true }));
    c.form.patchValue(validPayload());
    c.submit();

    expect(c.quoteApi.submitQuote).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@test.com',
      phone: '555-1234',
      address: flattenedAddress(),
      serviceType: 'removal',
      preferredDate: '',
      message: '',
    });
    expect(c.submitting()).toBe(false);
    expect(c.success()).toBe(true);
  });

  it('handles API error and sets errorMessage', () => {
    const fixture = TestBed.createComponent(Quote);
    const c = fixture.componentInstance as any;

    c.quoteApi.submitQuote.mockReturnValue(throwError(() => new Error('fail')));
    c.form.patchValue(validPayload());
    c.submit();

    expect(c.submitting()).toBe(false);
    expect(c.errorMessage()).toMatch(/could not send/i);
  });
});
