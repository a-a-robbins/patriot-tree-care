import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { QuoteRequest, QuoteResponse } from '../models/quote-request';

function quoteEndpoint(): string {
  const base = environment.apiBaseUrl.replace(/\/$/, '');
  return `${base}/api/quote`;
}

/** Static demo when hosted on GitHub Pages without a deployed API. */
function isStaticDemoHost(): boolean {
  if (typeof globalThis.location === 'undefined') {
    return false;
  }
  return (
    globalThis.location.hostname.endsWith('github.io') && !environment.apiBaseUrl
  );
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
    return this.http.post<QuoteResponse>(quoteEndpoint(), payload);
  }
}
