import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStores } from 'stores';

const Layout: React.FC<{}> = ({ children }) => {
  const history = useHistory();
  const { authStore } = useStores();

  if (history.location.pathname === "/") {
    if (authStore.isAuthenticated()) {
      history.push("/quotes")
    } else {
      history.push("/login")
    }
  }

  return (
    <>
      {children}
    </>
  );
};

export default Layout;
