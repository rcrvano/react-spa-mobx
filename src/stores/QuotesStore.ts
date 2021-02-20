import { StoreInterface, RootStoreInterface, QuoteInterface } from 'interfaces';
import { observable, action, runInAction } from 'mobx';
import WebApi from 'services';


class QuotesStore implements StoreInterface {
  rootStore: RootStoreInterface;

  apiClient: WebApi;

  @observable
  quotes: Array<QuoteInterface> | undefined = [];

  @observable
  quotesFetchError: string | undefined;

  @observable
  isFetchInProgress: boolean | undefined = false;

  constructor(rootStore: RootStoreInterface) {
    this.rootStore = rootStore;
    this.apiClient = rootStore.apiClient;
  }

  @action.bound
  async fetchQuotes(): Promise<void> {
    if (this.quotes && this.quotes.length) {
      return;
    }

    runInAction(() => {
      this.isFetchInProgress = true;
    });

    try {
      const { result, error, assets } = await this.apiClient.common.getQuotes();
      runInAction(() => {
        this.isFetchInProgress = false;
        if (result !== "ok") {
          this.quotesFetchError = error;
        } else {
          this.quotes = assets;
        }
      });
    } catch (err) {
      runInAction(() => {
        this.isFetchInProgress = false;
        this.quotesFetchError = err;
      });
    }
  }

  @action.bound
  async toggleFavourite(quote: QuoteInterface): Promise<void> {
    runInAction(() => {
      quote.favourite = !quote.favourite;
      if (quote.favourite) {
        const index = this.quotes && this.quotes.findIndex((item, index) => item.asset === quote.asset)
        this.quotes && index && index !== -1 && this.quotes.unshift(...this.quotes.splice(index, 1));
      }
    });
  }
}

export default QuotesStore;
