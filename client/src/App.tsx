import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

export function App() {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Box
        bgImage="url('./kings-canyon-bg.jpg')"
        bgPosition="center"
        bgRepeat="no-repeat"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        filter="blur(3px)"
        zIndex={-1}
      />
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Nav />
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
    </Flex>
  );
}
