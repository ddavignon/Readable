import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchPosts } from '../actions/index';

class PostsList extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return (this.props.posts).map(post => {
            return (
                <Link to={`posts/${post.id}`} key={post.id}>
                    <ListGroupItem
                        header={post.title}
                    >
                        <div>{post.timestamp} by {post.author}</div> 
                        <div>{post.body}</div>
                        <div>{post.category} {post.voteScore}</div>
                    </ListGroupItem>
                </Link>
            );
        });
    }
    
    render() {
        console.log(this.props.posts)
        return (
            <ListGroup componentClass="ul">
                {this.renderPosts()}
            </ListGroup>
        );
    }
}

function mapStateToProps (state) {
    return { posts: state.posts.all.filter(post => !post.deleted) }
}

export default connect(mapStateToProps, { fetchPosts })(PostsList);
