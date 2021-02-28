import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Router, Route, hashHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import requireAuth from './components/requireAuth';
import CategoryList from './components/CategoryList';
import CategoryCreate from './components/CategoryCreate';
import WordTranslations from './components/WordTranslations';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(CategoryList)} />
          <Route path="categories/new" component={requireAuth(CategoryCreate)} />
          <Route path="categories/:id" component={requireAuth(WordTranslations)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
