import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    Button,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import NotFound from './NotFound';
import {
    fetchPostComments,
    voteForComment,
    deleteCommentPost,
    fetchPostCommentsCount
} from '../actions';
import { timestampToDate } from '../utils/dateHelper';


class CommentsList extends Component {
    
    componentWillMount() {
        const { fetchPostComments, postId } = this.props;
        fetchPostComments(postId);
    }
    
    deleteButtonPress(id) {
        const {
            deleteCommentPost,
            fetchPostComments,
            postId
        } = this.props;
        
        deleteCommentPost(id, () => {
            fetchPostComments(postId);
        });
    }
    
    renderCommentsList() {
        const { comments, voteForComment, postCategory } = this.props
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
                            <Button onClick={() => voteForComment(post.id, 'upVote')}>
                                upvote
                            </Button>
                            <Button onClick={() => voteForComment(post.id, 'downVote')}>
                                downvote
                            </Button>
                            <Link to={`/${postCategory}/${post.parentId}/comments/edit/${post.id}`}>
                                <Button
                                    bsStyle="warning"
                                >
                                    Edit Comment
                                </Button>
                            </Link>
                            <Button
                                bsStyle="danger"
                                onClick={() => this.deleteButtonPress(post.id)}
                            >
                                Delete Comment
                            </Button>
                        </ListGroupItem>
                );
            });
        }
        return <NotFound />
    }
    
    render() {
        return (
            <ListGroup>{this.renderCommentsList()}</ListGroup>
        );
    }
}

function mapStateToProps (state) {
    const comments = _.filter(state.comments, comment => !comment.deleted);
    return { comments }
}

export default connect(mapStateToProps, {
    fetchPostComments, voteForComment, deleteCommentPost, fetchPostCommentsCount
})(CommentsList);
