import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { QuoteRequest, QuoteResponse } from '../models/quote-request';

function quoteEndpoint(): string {
  const base = environment.apiBaseUrl.replace(/\/$/, '');
  return `${base}/api/quote`;
}

@Injectable({ providedIn: 'root' })
export class QuoteApiService {
  private readonly http = inject(HttpClient);

  submitQuote(payload: QuoteRequest): Observable<QuoteResponse> {
    return this.http.post<QuoteResponse>(quoteEndpoint(), payload);
  }
}
