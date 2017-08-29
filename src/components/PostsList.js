import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    Button, ListGroup, ListGroupItem
} from 'react-bootstrap';
import {
    fetchPosts,
    voteForPost
} from '../actions';
import { timestampToDate } from '../utils/dateHelper';

class PostsList extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }
    
    renderPosts() {
        const { posts, voteForPost } = this.props;
        
        if (posts.length === 0) {
            return <div>No posts found for the category!</div>
        }
        
        if (posts) {
            return _.map(posts, post => {
                return (
                        <ListGroupItem
                            header={post.title}
                            key={post.id}
                        >
                            <div>{timestampToDate(post.timestamp)} by {post.author}</div> 
                            <div>{post.body}</div>
                            <div>{post.category} {post.voteScore}</div>
                            <Link to={`posts/${post.id}`} key={post.id}>
                                <Button>Read Post</Button>
                            </Link>
                            <Button onClick={() => voteForPost(post.id, 'upVote')}>
                                upvote
                            </Button>
                            <Button onClick={() => voteForPost(post.id, 'downVote')}>
                                downvote
                            </Button>
                        </ListGroupItem>
                );
            });
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
    fetchPosts, voteForPost
})(PostsList);
