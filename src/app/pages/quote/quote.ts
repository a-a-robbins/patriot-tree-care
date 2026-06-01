import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QUOTE_SERVICE_OPTIONS, SITE } from '../../core/data/site-content';
import { QuoteApiService } from '../../core/services/quote-api.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';

@Component({
  selector: 'app-quote',
  imports: [ReactiveFormsModule, PageHero],
  templateUrl: './quote.html',
  styleUrl: './quote.scss',
})
export class Quote {
  private readonly fb = inject(FormBuilder);
  private readonly quoteApi = inject(QuoteApiService);

  protected readonly isDemoHost =
    typeof globalThis.location !== 'undefined' &&
    globalThis.location.hostname.endsWith('github.io');

  protected readonly site = SITE;
  protected readonly serviceOptions = QUOTE_SERVICE_OPTIONS;
  protected readonly submitting = signal(false);
  protected readonly success = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(7)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    serviceType: ['', Validators.required],
    preferredDate: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    // Honeypot — leave empty; bots often fill hidden fields
    website: [''],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.controls.website.value) {
      this.success.set(true);
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    const { website: _honeypot, ...payload } = this.form.getRawValue();

    this.quoteApi.submitQuote(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.success.set(true);
        this.form.reset();
      },
      error: () => {
        this.submitting.set(false);
        this.errorMessage.set(
          'We could not send your request right now. Please call us or try again shortly.',
        );
      },
    });
  }
}
