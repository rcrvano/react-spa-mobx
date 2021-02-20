import React from 'react';
import { Header } from 'semantic-ui-react';
import { useStores } from 'stores';
import { useObserver } from 'mobx-react-lite';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';


export const AppHeader: React.FC<{ }> = () => {
  const { authStore } = useStores();
  const { t } = useTranslation();
  const history = useHistory();

  function logoutHandler(): void {
    authStore.logout();
    history.push("/login");
  }

  return useObserver(() => {
    return (
      <Header as="div">
        <div className={"title"}>{t("title")}</div>
        {authStore.isAuthenticated() ? (
          <div className={"logout"}>
            <Button
              onClick={logoutHandler}
              className={"logout-button"}
            >
              {t("login.logout")}
            </Button>
          </div>
        ) : null}
      </Header>
    );
  });
};


export default AppHeader;
