import React, { useEffect, useState, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useObserver } from 'mobx-react-lite';
import { useStores } from 'stores';
import { Form, Grid, Button, Select, Input } from 'semantic-ui-react';


export const Quotes: React.FC<{ }> = () => {
  const { quotesStore } = useStores();
  const { t } = useTranslation();

  const [result, setResult] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [fromQuote, setFromQuote] = useState<string>();
  const [toQuote, setToQuote] = useState<string>();

  useEffect(() => {
    quotesStore.fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFromQuoteChange = (_ev: SyntheticEvent, { value }: { value?: string }): void => {
    setResult("");
    setFromQuote(value);
  }
  const handleToQuoteChange = (_ev: SyntheticEvent, { value }: { value?: string }): void => {
    setResult("");
    setToQuote(value);
  }
  const handleAmountChange = (_ev: SyntheticEvent, { value }: { value: number }): void => {
    setResult("");
    setAmount(value);
  }

  const getFromQuoteList = () => {
    if (!quotesStore.quotes || !quotesStore.quotes.length) {
      return []
    }

    return quotesStore.quotes.map(quote => {
      return quote.asset.split("/")[0]
    }).filter((value, index, self) =>{
      return self.indexOf(value) === index;
    }).map(asset => {
      return {key: asset, value: asset, text: asset}
    });
  }

  const getToQuoteList = () => {
    if (!quotesStore.quotes || !quotesStore.quotes.length || !fromQuote) {
      return []
    }

    return quotesStore.quotes.map(quote => {
      return quote.asset.split("/")[1]
    }).filter((value, index, self) =>{
      return self.indexOf(value) === index;
    }).map(asset => {
      const exist = quotesStore.quotes ? quotesStore.quotes.find(q=>q.asset === `${fromQuote}/${asset}`) : false;

      return {key: asset, value: asset, text: asset, disabled: !exist}
    });
  }

  const getResultHandler = (): void => {
    const item = quotesStore.quotes ? quotesStore.quotes.find(q=>q.asset === `${fromQuote}/${toQuote}`) : null;
    if (!item || !amount) setResult("0");
    else setResult((parseFloat(item.quote)*amount).toFixed(2) );
  }

  return useObserver(() => {
    if (quotesStore.isFetchInProgress) {
      return <div className="loading">{t('loading')}</div>
    }

    if (!quotesStore.quotes || !quotesStore.quotes.length) {
      return <div className="no-data">{t("calculator.noData")}</div>
    }

    return (
      <div className="module-content-inner">
        <div className="module-header">{t('calculator.title')}</div>

        <div className="calculator-form">
          <Grid>
            <Grid.Row>
              <Grid.Column width={3}>
                <Form.Field
                  style={{width:1}}
                  control={Input}
                  label={t('calculator.amount')}
                  value={amount}
                  onChange={handleAmountChange}
                  className={"className"}
                  type={"text"}
                />
              </Grid.Column>

              <Grid.Column style={{paddingTop:23, paddingLeft:20}} width={6}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={8}>
                        <Form.Field
                            control={Select}
                            options={getFromQuoteList()}
                            onChange={handleFromQuoteChange}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Form.Field
                            control={Select}
                            options={getToQuoteList()}
                            onChange={handleToQuoteChange}
                        />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>

              <Grid.Column style={{paddingTop:23 , paddingLeft:20}} width={6}>
                <Button
                  onClick={getResultHandler}
                >
                  {t('calculator.calc')}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <hr/>

        <div className={"calculator-result"}>
          {result !== "" ? (
            <div>
              <div className={"title"}>{t('calculator.total')}</div>
              <div className={"value"}>{result}</div>
            </div>
          ) : null}
        </div>
      </div>
    )
  });
};


export default Quotes;
