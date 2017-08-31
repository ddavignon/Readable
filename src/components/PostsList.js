import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ListGroup
} from 'react-bootstrap';
import {
    fetchPosts,
    voteForPost,
    deletePost,
    fetchPostComments,
    fetchCategoryPosts,
    postSortOrder
} from '../actions';
import PostsListDetail from './PostsListDetail';


class PostsList extends Component {
    componentWillMount() {
        if(this.props.match.params.category) {
            const {
                fetchCategoryPosts,
                match: { params: { category } } } = this.props;
            fetchCategoryPosts(category.toLowerCase());
        } else {
            this.props.fetchPosts();
        }
    }
    
    deleteButtonPress(id) {
        this.props.deletePost(id, () => {});
    }
    
    renderPosts() {
        const { posts } = this.props;
        
        if (posts.length === 0) {
            return <div>No posts found for the category!</div>
        }
            
        if (posts) {
            const orderedPosts = _.sortBy(posts, this.props.postsOrder).reverse()
            
            return _.map(orderedPosts, post => <PostsListDetail key={post.id} post={post} />);
        }
        
        return <div>Loading...</div>
    }
    
    render() {
        const { postSortOrder } = this.props;
        return (
            <div>
                <div className="form-inline text-right">
                  <label htmlFor="sel1">SortBy:</label>
                  <select onChange={event => postSortOrder(event.target.value)}className="form-control" id="sel1">
                    <option value='voteScore'>Votes</option>
                    <option value='timestamp'>Date</option>
                  </select>
                </div>
                <ListGroup componentClass="ul">
                    {this.renderPosts()}
                </ListGroup>
            </div>
        );
    }
}

function mapStateToProps (state) {
    const posts = _.filter(state.posts, post => !post.deleted);
    const { postsOrder } = state;
    return { posts, postsOrder }
}

export default connect(mapStateToProps, {
    fetchPosts,
    voteForPost,
    deletePost,
    fetchPostComments,
    fetchCategoryPosts,
    postSortOrder
})(PostsList);

