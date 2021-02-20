import React from 'react';
import { Container } from 'semantic-ui-react';
import AppHeader from './AppHeader';

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Container fluid>
        {children}
      </Container>
    </>
  );
};

export default Layout;
