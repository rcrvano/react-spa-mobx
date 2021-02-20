import React, { useState, SyntheticEvent } from 'react';
import { useObserver } from 'mobx-react-lite';
import { useStores } from 'stores';
import { Form, Input, Grid } from 'semantic-ui-react';

interface PaginationProps {
  changePage: any;
  limit: number;
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({limit, total, changePage}:PaginationProps) => {
  const { historyStore } = useStores();

  const [page, setPage] = useState<number>(0);
  const backHandler = ():void => {
    if (page>0) {
      setPage(page => page - 1);
      changePage(page-1);
    }
  }
  const nextHandler = (): void => {
    if (historyStore.deals && (page+1)*limit< historyStore.deals.length) {
      setPage(page => page + 1)
      changePage(page+1);
    }
  }
  const changePageHandler= (_ev: SyntheticEvent, { value: page }: { value: number }): void => {
    if (historyStore.deals && page>=0 && (page-1)*limit<historyStore.deals.length) {
      setPage(page-1);
      changePage(page-1);
    }
  }

  return useObserver(() => {
    if (!historyStore.deals || !historyStore.deals.length) {
      return <div>Нет данных</div>
    }

    return (
      <div className={'pagination'}>
        <Grid>
          <Grid.Column width={4}>
            <div onClick={backHandler} className={"back"}>
              <img alt='back' src={require("../../styles/img/arrow-left-blue.png")}/>
            </div>
          </Grid.Column>
          <Grid.Column  width={8}>
            <div className={"nav"}>
              <div>
                <Form.Field
                  control={Input}
                  className={"className"}
                  type={"text"}
                  onChange={changePageHandler}
                  value={page+1}
                />
              </div>
              <div style={{padding:"0px 10px"}}>/</div>
              <div>{Math.ceil(total/limit)}</div>
            </div>
          </Grid.Column>
          <Grid.Column  width={4}>
            <div onClick={nextHandler} className={"next"}>
              <img alt='next' src={require("../../styles/img/arrow-right-blue.png")}/>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  });
};


export default Pagination;
