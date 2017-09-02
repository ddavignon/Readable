import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import PostsList from './PostsList';
import CategoriesList from './CategoriesList';


class PostsMain extends Component {
    render() {
        return (
            <Row>
                <Col md={2}>
                    <h3>Categories</h3>
                    <CategoriesList />
                </Col>
                <Col md={10}>
                    <Row>
                        <Col md={6} >
                            <h3>Posts</h3>
                        </Col>
                        <Col md={6} className="text-right">
                            <Link to="posts/new">
                                <Button bsStyle="success">Create Post</Button>
                            </Link>
                        </Col>
                    </Row>
                    <PostsList {...this.props} />
                </Col>
            </Row>
        );
    }
}

export default PostsMain;
