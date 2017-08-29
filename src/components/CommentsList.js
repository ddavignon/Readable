import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    Button, ListGroup, ListGroupItem
} from 'react-bootstrap';
import {
    fetchPostComments,
    voteForComment
} from '../actions';
import { timestampToDate } from '../utils/dateHelper';


class CommentsList extends Component {
    
    componentWillMount() {
        const { fetchPostComments, postId } = this.props;
        fetchPostComments(postId);
    }
    
    renderCommentsList() {
        const { comments, voteForComment } = this.props
        if (comments) {
            return _.map(comments, (post, id) => {
                return (
                        <ListGroupItem
                            header={post.title}
                            key={id}
                        >
                            <div>{timestampToDate(post.timestamp)} by {post.author}</div> 
                            <div>{post.body}</div>
                            <div>{post.category} {post.voteScore}</div>
                            <Link to={`posts/${post.id}`} key={post.id}>
                                <Button>Read Post</Button>
                            </Link>
                            <Button onClick={() => voteForComment(post.id, 'upVote')}>
                                upvote
                            </Button>
                            <Button onClick={() => voteForComment(post.id, 'downVote')}>
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
            <div>{this.renderCommentsList()}</div>
        );
    }
}

function mapStateToProps (state) {
    const comments = _.filter(state.comments, comment => !comment.deleted);
    return { comments }
}

export default connect(mapStateToProps, {
    fetchPostComments, voteForComment
})(CommentsList);
