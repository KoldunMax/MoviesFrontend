import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import createStore from '../store';
import history from '../store/history';
import Movies from '../containers/Movies/Movies';

const store = createStore();


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="movies" />} />
          <Route path="/movies" component={Movies} exact />
        </Switch>
      </ConnectedRouter>
    </Provider>
    );
  }
}

export default App;