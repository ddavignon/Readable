import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import PostsMain from './PostsMain';
import PostsDetail from './PostsDetail';
import PostsNew from './PostsNew';
import PostsEdit from './PostsEdit';

class App extends Component {
  render() {
    return (
      <Grid>
        <Switch>
          <Route path="/" exact component={PostsMain} />
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/edit/:id" children={props => <PostsEdit {...props}/>} />
          <Route path="/posts/:id" component={PostsDetail} />
        </Switch>
      </Grid>
    );
  }
}

export default App;
