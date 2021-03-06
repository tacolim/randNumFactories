import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';


import './index.css';
import App from './App';
import { LogIn, Register } from './components';
import rootReducer from './reducers';
import WithAuth from './components/auth/withAuth';
import Dash from './components/tree/dash';
import CreateTree from './components/tree/createTree.jsx';
import EditTree from './components/tree/edit.jsx';
import Settings from './components/user/settings';

const history = createHistory();

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(ReduxThunk, routerMiddleware(history)),
  );

const AuthEdit = WithAuth(EditTree);

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
          <Route path="/trees" component={WithAuth(Dash)} />
          <Route path="/tree/create" component={WithAuth(CreateTree)} />
          <Route exact path="/tree/edit/:id" render={props => <AuthEdit {...props} />} />
          <Route path="/settings" component={WithAuth(Settings)} />
        </Switch>
      </Router>
    </Provider>,
  document.getElementById('root'),
);
