import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import createStore from '../store';
import history from '../store/history';
import Movies from '../containers/Movies/Movies';
import MovieCreation from '../containers/MovieCreation/MovieCreation';

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="movies" />} />
          <Route path="/movies" component={Movies} exact />
          <Route path="/movies/new" component={MovieCreation} exact />
        </Switch>
      </ConnectedRouter>
    </Provider>
    );
  }
}

export default App;