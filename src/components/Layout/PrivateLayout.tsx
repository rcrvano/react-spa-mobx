import React, { SyntheticEvent } from 'react';
import { Tab, TabProps } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Layout: React.FC<{}> = ({ children }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const menuItems = [
    { link: "/quotes", menuItem: t("menu.quotes") },
    { link: "/calculator", menuItem: t("menu.calculator") },
    { link: "/history", menuItem: t("menu.history") },
  ]

  const tabChangeHandler = (event: SyntheticEvent, { activeIndex=0 }: TabProps): void => {
    const tab = menuItems[Number(activeIndex)];
    history.push(tab.link)
  }

  const currentIndex = menuItems.findIndex(item=>item.link === history.location.pathname);

  return (
    <div style={{maxWidth:750, margin:"0 auto"}}>
      <Tab panes={menuItems} activeIndex={currentIndex} onTabChange={tabChangeHandler} />
      <div className={'module-content-radius'}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
