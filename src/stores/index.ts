import React from 'react';
import { configure } from 'mobx';
import WebApi from 'services';
import { RootStoreInterface } from 'interfaces';
import { observable, action } from 'mobx';
import HistoryStore from './HistoryStore';
import QuotesStore from './QuotesStore';
import AuthStore from './AuthStore';

configure({ enforceActions: 'observed' });

export class RootStore implements RootStoreInterface {
  apiClient!: WebApi;

  @observable
  historyStore!: HistoryStore;

  @observable
  quotesStore!: QuotesStore;

  @observable
  authStore!: AuthStore;

  constructor() {
    this.init();
  }

  init(): void {
    this.initApiClient();
    this.initStores();
  }

  initApiClient() {
    if (!process.env.REACT_APP_API_BASE_URL) {
      throw new Error('Missing API baseURL');
    }


    this.apiClient = new WebApi({
      baseURL: process.env.REACT_APP_API_BASE_URL
    });
  }

  @action
  initStores() {
    this.authStore = new AuthStore(this);
    this.historyStore = new HistoryStore(this);
    this.quotesStore = new QuotesStore(this);
  }

  resetStores(): void {
    this.init();
  }
}

const createStores = (): RootStore => {
  return new RootStore();
};

export const storesContext = React.createContext(createStores());

export const useStores = () => React.useContext(storesContext);
