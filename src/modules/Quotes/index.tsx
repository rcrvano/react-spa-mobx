import React, { useEffect } from 'react';
import { QuoteInterface } from 'interfaces';
import { useObserver } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useStores } from 'stores';
import { Table } from 'semantic-ui-react'
import moment from "moment";


export const Quotes: React.FC<{ }> = () => {
  const { quotesStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    quotesStore.fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavourite = (quote: QuoteInterface): void => {
    quotesStore.toggleFavourite(quote)
  }

  return useObserver(() => {
    if (quotesStore.isFetchInProgress) {
      return <div className="loading">{t('loading')}</div>
    }

    if (!quotesStore.quotes || !quotesStore.quotes.length) {
      return <div className="no-data">{t('quotes.no_data')}</div>
    }

    return (
      <Table celled striped className="table-scrollable">
        <Table.Header>
          <Table.Row>
            <Table.Cell collapsing></Table.Cell>
            <Table.Cell>{t('quotes.asset')}</Table.Cell>
            <Table.Cell>{t('quotes.quote')}</Table.Cell>
            <Table.Cell>{t('quotes.startDate')}</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {quotesStore.quotes && quotesStore.quotes.length && quotesStore.quotes.map(quote => (
            <Table.Row>
              <Table.Cell collapsing onClick={()=>{handleFavourite(quote)}}>
                <img alt="favourite" src={require(`styles/img/star${quote.favourite ? "_active" : ""}.png`)}/>
              </Table.Cell>
              <Table.Cell>{quote.asset}</Table.Cell>
              <Table.Cell>{quote.quote}</Table.Cell>
              <Table.Cell>{moment(quote.startDate).format("D.MM.YYYY")}</Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table>
    );
  });
};


export default Quotes;
