import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import PostsMain from './PostsMain';
import PostsDetail from './PostsDetail';
import PostsNew from './PostsNew';
import PostsEdit from './PostsEdit'
import CommentsDetail from './CommentsDetail';
import CommentsNew from './CommentsNew';
import CommentsEdit from './CommentsEdit';
import NavbarHeader from './NavbarHeader';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavbarHeader />
          <Grid>
            <Switch>
              <Route path="/" exact component={PostsMain} />
              <Route path="/:category" component={props => <PostsMain {...props} />} />
              <Route path="/posts/new" component={PostsNew} />
              <Route path="/posts/edit/:id" children={props => <PostsEdit {...props}/>} />
              <Route path="/posts/:id" exact component={PostsDetail} />
              <Route path="/posts/:id/comments/new" component={CommentsNew} />
              <Route path="/posts/:postId/comments/edit/:id" component={props => <CommentsEdit {...props}/>} />
              <Route path="/comments/:id" exact component={CommentsDetail} />
            </Switch>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
