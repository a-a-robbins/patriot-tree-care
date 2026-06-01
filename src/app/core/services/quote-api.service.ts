import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { QuoteRequest, QuoteResponse } from '../models/quote-request';

/** GitHub Pages is static-only; quote emails need the Node API on a real host. */
function isStaticDemoHost(): boolean {
  if (typeof globalThis.location === 'undefined') {
    return false;
  }
  return globalThis.location.hostname.endsWith('github.io');
}

@Injectable({ providedIn: 'root' })
export class QuoteApiService {
  private readonly http = inject(HttpClient);

  submitQuote(payload: QuoteRequest): Observable<QuoteResponse> {
    if (isStaticDemoHost()) {
      return throwError(
        () =>
          new Error(
            'Quote form is disabled on the GitHub Pages demo. Call the number on the site or deploy the API.',
          ),
      );
    }
    return this.http.post<QuoteResponse>('/api/quote', payload);
  }
}
