import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Button,
    Row,
    Col,
    Label,
    Glyphicon
} from 'react-bootstrap';
import CommentsList from './CommentsList';
import NotFound from './NotFound';
import {
    fetchPost,
    deletePost,
    voteForPost,
    fetchPostCommentsCount
} from '../actions';
import { timestampToDate } from '../utils/dateHelper';


class PostsDetail extends Component {
    state = {
        commentCount: 0    
    }
    
    componentWillMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
        this.props.fetchPostCommentsCount(id, (data) => {
            this.setState({ commentCount: data.count })
        });
    }
    
    componentDidReceiveProps(nextProps) {
        console.log(nextProps)
    }

    deleteButtonPress() {
        this.props.deletePost(this.props.match.params.id, () => {
            this.props.history.push('/')
        });
    }
    
    render() {
        const {
            post,
            voteForPost,
            match: {
                params: {
                    category
                }
            }
        } = this.props;

        return (
            (!post || post.category !== category)
            ? <NotFound />
            :
                <div>
                    <Link to="/"><Button>Back</Button></Link>
                    <Link to={`/${category}/edit/${post.id}`}>
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
                    <Row>
                        <Col md={12}>
                            <Col md={8} className="text-left">
                                <h2>{post.title}<br/><small>Posted by {post.author}</small></h2>
                                <div className="badge">{timestampToDate(post.timestamp)}</div>
                                <h4><Label bsStyle="primary">{post.category}</Label></h4>
                                <p>{post.body}</p>
                                {this.state.commentCount ? this.state.commentCount : 0 } comments
                            </Col>
                            <Col md={4} className="text-right">
                                <h3><Label bsStyle={post.voteScore < 0 ? "danger": "success"}>{post.voteScore}</Label></h3>
                                <Button onClick={() => voteForPost(post.id, 'upVote')}>
                                    <Glyphicon glyph="thumbs-up" />
                                </Button>
                                <Button onClick={() => voteForPost(post.id, 'downVote')}>
                                    <Glyphicon glyph="thumbs-down" />
                                </Button>
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="text-right">
                        <Link to={`/${post.category}/${post.id}/comments/new`}>
                                <Button bsStyle="primary">Add comment</Button>
                            </Link>  
                        </Col>
                    </Row>
                    <CommentsList postCategory={post.category} postId={post.id} />
                </div>    
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {
    fetchPost, deletePost, voteForPost, fetchPostCommentsCount
})(PostsDetail);


