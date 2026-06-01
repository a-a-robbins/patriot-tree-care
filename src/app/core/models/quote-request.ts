export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  preferredDate?: string;
  message: string;
}

export interface QuoteResponse {
  ok: boolean;
  message?: string;
}
