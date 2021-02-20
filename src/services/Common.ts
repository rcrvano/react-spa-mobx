import { AxiosInstance } from 'axios';
import { QuotesResponseInterface, HistoryResponseInterface } from 'interfaces';


class Common {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getQuotes(): Promise<QuotesResponseInterface> {
    const { data } = await this.api.post('', {action: "quote"});
    return data;
  }

  async getHistory(): Promise<HistoryResponseInterface> {
    const { data } = await this.api.post('', {action: "history"});
    return data;
  }
}

export default Common;
