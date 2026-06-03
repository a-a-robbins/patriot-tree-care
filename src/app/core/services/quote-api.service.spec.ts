import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { QuoteApiService } from './quote-api.service';
import { QuoteRequest } from '../models/quote-request';

describe('QuoteApiService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('sends POST to /api/quote with the payload', () => {
    const service = TestBed.inject(QuoteApiService);
    const payload: QuoteRequest = {
      name: 'John',
      email: 'john@test.com',
      phone: '555-1234',
      address: '123 Main St',
      serviceType: 'removal',
      message: 'Please remove a large oak tree.',
    };

    let response: unknown;
    service.submitQuote(payload).subscribe((r) => (response = r));

    const req = httpMock.expectOne('/api/quote');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({ ok: true });
    expect(response).toEqual({ ok: true });
  });

  it('handles a different payload shape', () => {
    const service = TestBed.inject(QuoteApiService);
    const payload: QuoteRequest = {
      name: 'Jane',
      email: 'jane@test.com',
      phone: '555-5678',
      address: '456 Oak Ave',
      serviceType: 'stump',
      message: 'Grind three stumps.',
    };

    service.submitQuote(payload).subscribe();

    const req = httpMock.expectOne('/api/quote');
    expect(req.request.body).toEqual(payload);
    req.flush({ ok: true });
  });
});
