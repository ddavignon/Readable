import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchPosts } from '../actions/index';

class PostsMain extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }
    
    renderPosts() {
        return (this.props.posts).map(post => {
            return (
                <ListGroupItem
                    header={post.title}
                    key={post.id}
                >
                    <div>{post.timestamp} by {post.author}</div> 
                    <div>{post.body}</div>
                    <div>{post.category} {post.voteScore}</div>
                </ListGroupItem>
            );
        });
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
    return { posts: state.posts.all }
}

export default connect(mapStateToProps, { fetchPosts })(PostsMain);
