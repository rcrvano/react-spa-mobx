import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { useStores } from 'stores';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react'
import moment from "moment";
import Pagination from "components/Pagination";

export const Quotes: React.FC<{ }> = () => {
  const { historyStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    historyStore.fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const limit = historyStore.limit;
  const [page, setPage] = useState<number>(0);

  const changePageHandler = (page: number): void => {
    setPage(page);
  }

  return useObserver(() => {
    if (historyStore.isFetchInProgress) {
      return <div className="loading">{t('loading')}</div>
    }

    if (!historyStore.deals || !historyStore.deals.length) {
      return <div className="no-data">{t('noData')}</div>
    }

    return (
      <div>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell>{t("history.asset")}</Table.Cell>
              <Table.Cell>{t("history.startDate")}</Table.Cell>
              <Table.Cell>{t("history.startQuote")}</Table.Cell>
              <Table.Cell>{t("history.finishDate")}</Table.Cell>
              <Table.Cell>{t("history.finishQuote")}</Table.Cell>
              <Table.Cell>{t("history.profit")}</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {historyStore.deals && historyStore.deals.length && historyStore.deals.slice(page*limit, page*limit + limit).map((quote,key) => (
              <Table.Row key={key}>
                <Table.Cell>{quote.asset}</Table.Cell>
                <Table.Cell>{moment(quote.startDate).format("hh:mm D.MM.YYYY")}</Table.Cell>
                <Table.Cell>{quote.startQuote}</Table.Cell>
                <Table.Cell>{moment(quote.finishDate).format("hh:mm D.MM.YYYY")}</Table.Cell>
                <Table.Cell>{quote.finishQuote}</Table.Cell>
                <Table.Cell>{quote.profit}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <Pagination
          changePage={changePageHandler}
          limit={limit}
          total={historyStore.deals.length}/>
      </div>

    );
  });
};


export default Quotes;
