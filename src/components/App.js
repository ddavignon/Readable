import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PostsMain from './PostsMain';
import PostsDetail from './PostsDetail';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={PostsMain} />
        <Route path="/posts/:id" component={PostsDetail} />
      </div>
    );
  }
}

export default App;
