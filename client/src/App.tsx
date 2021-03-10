import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

export function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile/:platform/:id">
            <Profile />
          </Route>
        </Switch>
      </QueryParamProvider>
    </Router>
  );
}
