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
    fetchCategoryPosts
} from '../actions';
import PostsListDetail from './PostsListDetail';


class PostsList extends Component {
    componentWillMount() {
        console.log(this.props);
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
            return _.map(posts, post => <PostsListDetail key={post.id} post={post} />);
        }
        
        return <div>Loading...</div>
    }
    
    render() {
        return (
            <ListGroup componentClass="ul">
                {this.renderPosts()}
            </ListGroup>
        );
    }
}

function mapStateToProps (state) {
    const posts = _.filter(state.posts, post => !post.deleted);
    return { posts }
}

export default connect(mapStateToProps, {
    fetchPosts, voteForPost, deletePost, fetchPostComments, fetchCategoryPosts
})(PostsList);

