import { StoreInterface, RootStoreInterface, HistoryInterface } from 'interfaces';
import { observable, action, runInAction } from 'mobx';
import WebApi from 'services';
import moment from "moment";


class HistoryStore implements StoreInterface {
  rootStore: RootStoreInterface;

  apiClient: WebApi;

  @observable
  deals: Array<HistoryInterface> | undefined = [];

  @observable
  historyFetchError: string | undefined;

  @observable
  isFetchInProgress: boolean | undefined = false;

  limit = 10;

  constructor(rootStore: RootStoreInterface) {
    this.rootStore = rootStore;
    this.apiClient = rootStore.apiClient;

  }

  /**
   * @param deals
   * @return deals
   *
   * @description
   * На вход попадает 100 сделок. Отобразить столько страниц, сколько получится из того набора данных,
   * которые попадают на вход согласно приведённым ниже критериям и по 10 сделок истории на странице.
   * В каждой десятке должно быть:
   * - не больше 2-х убыточных сделок;
   * - сделки отсортированы по дате и времени закрытия в контексте всей истории(вверху ближайшая сделка к текущей даты и времени, и так далее)
   * - хотя бы 1-2 сделки с прибыльностью больше 100 долларов
   * - не более двух одинаковых активов
   */
  resortDeales (deals: Array<HistoryInterface>): Array<HistoryInterface>  {
    //1. sort by finishDate
    deals = deals.sort( (a:HistoryInterface, b:HistoryInterface): number => {
      return moment(b.finishDate).unix() - moment(a.finishDate).unix();
    });


    for (let page=0; page*this.limit<deals.length; page++) {
      const sameAssets: { [index: string]: number } = { };
      let countUnprofitable=0;
      let countGoodProfitable=0;
      for (let j=0; j<this.limit && page*this.limit + j<deals.length; j++) {
        const index = page*this.limit + j
        const item = deals[index];
        sameAssets[item.asset] = sameAssets[item.asset] ? sameAssets[item.asset] + 1 : 1;
        if (sameAssets[item.asset] > 2) {
          //не более двух одинаковых активов
          deals.splice (index, 1);
        } else if (item.profit<0 && countUnprofitable++ >= 2) {
          //не больше 2-х убыточных сделок;
          deals.splice(index, 1);
        }
        if (item.profit>100) { countGoodProfitable++ };
      }
      if (countGoodProfitable<1) {
        //хотя бы 1-2 сделки с прибыльностью больше 100 долларов
        const prevIndex = (page+1)*this.limit -1;
        while (deals[prevIndex] && deals[prevIndex].profit<100) {
          deals.splice(prevIndex, 1);
        }
      }
    }
    return deals;
  }

  @action.bound
  async fetchHistory(): Promise<void> {
    runInAction(() => {
      this.isFetchInProgress = true;
    });

    try {
      const { result, error, deals } = await this.apiClient.common.getHistory();
      runInAction(() => {
        this.isFetchInProgress = false;
        if (result !== "ok") {
          this.historyFetchError = error;
        } else if (deals) {
          this.deals = this.resortDeales(deals);
        }
      });
    } catch (err) {
      runInAction(() => {
        this.isFetchInProgress = false;
        this.historyFetchError = err;
      });
    }
  }
}

export default HistoryStore;
