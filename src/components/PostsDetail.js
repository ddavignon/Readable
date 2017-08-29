import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CommentsList from './CommentsList';
import { fetchPost, deletePost } from '../actions';


class PostsDetail extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    deleteButtonPress() {
        this.props.deletePost(this.props.match.params.id, () => {
            this.props.history.push('/')
        });
    }
    
    render() {
        const { post } = this.props;
        if (!post) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Link to="/"><Button>Back</Button></Link>
                <Link to={`/posts/edit/${post.id}`}>
                    <Button
                        bsStyle="warning"
                    >
                        Edit Post
                    </Button>
                </Link>
                <Button
                    bsStyle="danger"
                    onClick={this.deleteButtonPress.bind(this)}
                >
                    Delete Post
                </Button>
                <h2>{post.title}</h2>
                <h4>{post.author} <small>{post.category}</small></h4>
                <p>{post.body}</p>
                <Link to={`/posts/${post.id}/comments/new`}>
                    <Button>Add comment</Button>
                </Link>
                <CommentsList postId={post.id} />
            </div>    
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsDetail);


