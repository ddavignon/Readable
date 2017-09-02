import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    Label,
    Glyphicon,
    ButtonGroup
} from 'react-bootstrap';
import {
    voteForPost,
    deletePost,
    fetchPostCommentsCount
} from '../actions';
import { timestampToDate } from '../utils/dateHelper';


class PostsListDetail extends Component {
    state = {
        commentCount: 0
    }

    componentWillMount() {
        this.props.fetchPostCommentsCount(this.props.post.id, (data) => {
            this.setState({ commentCount: data.count })
        });
    }

    deleteButtonPress(id) {
        this.props.deletePost(id, () => {});
    }
    
    render() {
        const { post, voteForPost } = this.props;
        
        return (
            <li className="list-group-item">
                <ButtonGroup className="pull-right">
                    <Button
                        bsStyle="danger"
                        onClick={() => this.deleteButtonPress(post.id)}
                    >
                        Delete Post
                    </Button>
                    <Link to={`/${post.category}/edit/${post.id}`}>
                        <Button
                            bsStyle="warning"
                        >
                            Edit Post
                        </Button>
                    </Link>
                </ButtonGroup>
                <h2><Link
                        to={`${post.category}/${post.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        {post.title}
                    </Link>
                    <br/><small>Posted by {post.author}</small>
                </h2>
                <p>{post.body}</p>
                <Row>
                    <Col md={12}>
                        <Col md={9} className="text-left">
                            <div className="badge">{timestampToDate(post.timestamp)}</div>
                            <h4><Label bsStyle="primary">{post.category}</Label></h4>
                            {this.state.commentCount ? this.state.commentCount : 0 } comments
                        </Col>
                        <Col md={3} className="text-right">
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
            </li>
        );
    }
}

function mapStateToProps (state, ownProps) {
    const { commentCount } = state.comments;
    return { commentCount };
}

export default connect(mapStateToProps, {
    voteForPost, deletePost, fetchPostCommentsCount
})(PostsListDetail);

