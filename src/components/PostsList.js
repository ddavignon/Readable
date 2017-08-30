import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    Label,
    Glyphicon,
    ListGroup
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
                    <li key={post.id} className="list-group-item">
                        <h2><Link
                                to={`posts/${post.id}`}
                            >
                                {post.title}
                            </Link>
                            <br/><small>Posted by {post.author}</small>
                        </h2>
                        <p>{post.body}</p>
                        <Row>
                            <Col md={12}>
                                <Col md={10}>
                                    <div className="badge">{timestampToDate(post.timestamp)}</div>
                                    <Label bsStyle="primary">{post.category}</Label>
                                </Col>
                                <Col md={2}>
                                    <Label bsStyle={post.voteScore < 0 ? "danger": "success"}>{post.voteScore}</Label>
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
