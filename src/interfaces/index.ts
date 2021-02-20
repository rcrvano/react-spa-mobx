import WebApi from 'services';

export interface StoreInterface {
  rootStore: RootStoreInterface;
  apiClient?: WebApi;
}

export interface RootStoreInterface {
  apiClient: WebApi;
  resetStores(): void;
  historyStore: StoreInterface;
  quotesStore: StoreInterface;
  authStore: StoreInterface;
}



export interface AuthResponse {
  result: string;
  error: string;
}


export interface QuoteInterface {
  asset: string,
  startDate: string,
  quote: string,
  favourite?: boolean
}

export interface QuotesResponseInterface {
  result: string;
  error?: string;
  assets?: Array<QuoteInterface>;
}




export interface HistoryInterface {
  asset: string,
  startDate: string,
  startQuote: string,
  finishDate: string,
  finishQuote: string,
  profit: number,
}

export interface HistoryResponseInterface {
  result: string;
  error?: string;
  deals?: Array<HistoryInterface>;
}
