import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import routes from '../../routes';

import HomePage from '../Pages/HomePage';
import MoviesPage from '../Pages/MoviesPage';
import MovieDetailsPage from '../Pages/MovieDetailsPage';

const App = () => (
  <BrowserRouter>
    <Navigation />
    <Switch>
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.MOVIES} component={MoviesPage} />
      <Route path={routes.MOVIES_ID} component={MovieDetailsPage} />
      <Redirect to={routes.HOME} />
    </Switch>
  </BrowserRouter>
);

export default App;
