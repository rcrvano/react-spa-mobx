import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Auth from './Auth';
import BaseLayout from 'components/Layout/BaseLayout';
import PrivateLayout from 'components/Layout/PrivateLayout';
import Login from 'modules/Login';
import Quotes from 'modules/Quotes';
import History from 'modules/History';
import Calculator from 'modules/Calculator';

import 'semantic-ui-css/semantic.min.css';
import 'styles/app.scss';

const App: React.FC<{}> = () => {
  return (
    <div id="app">
      <Router>
        <Auth>
          <BaseLayout>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/">
                <PrivateLayout>
                  <Switch>
                    <Route path="/quotes" component={Quotes} />
                    <Route path="/history" component={History} />
                    <Route path="/calculator" component={Calculator} />
                  </Switch>
                </PrivateLayout>
              </PrivateRoute>
            </Switch>
          </BaseLayout>
        </Auth>
      </Router>
    </div>
  );
}

export default App;
