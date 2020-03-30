import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from "react-router-dom";
import FlexGrid from '@tds/core-flex-grid';

import logo from './images/telus-logo.svg';
import './css/App.css';

import store from './store/store';
import history from './history';
import AddCommentButton from './modules/comments/components/AddCommentButton/index.jsx';
import CommentList from './modules/comments/components/CommentList/index.jsx';
import AddCommentForm from './modules/comments/components/AddCommentForm/index.jsx';
import EditCommentForm from './modules/comments/components/EditCommentForm/index.jsx';
import AsyncCommentList from './modules/comments/components/AsyncCommentList/index.jsx';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <MainContainer>
            <Route path="/" component={AddCommentButton} />
            <Route path="/add" component={AddCommentForm} />
            <Route path="/list" component={CommentList} />
            <Route path="/edit/:id" component={EditCommentForm} />
            <Route path="/async-list" component={AsyncCommentList} />
          </MainContainer>
        </Router>
      </Provider>
    );
  }
}

const MainContainer = (props) => (
  <FlexGrid>
    <FlexGrid.Row>
      <FlexGrid.Col>
        <div className="App">
          <div className="App-header">
            <img className="App-logo" src={logo} alt="telus-logo"/>
            <div className="App-title">Post Comments</div>
          </div>
          {props.children}
        </div>
      </FlexGrid.Col>
    </FlexGrid.Row>
  </FlexGrid>
);

export default App;


