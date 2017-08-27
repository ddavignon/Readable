import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost } from '../actions/index';

class PostsDetail extends Component {
    componentWillMount() {
        console.log(this.props)
        this.props.fetchPost(this.props.match.params.id);
    }
    
    render() {
        const { post } = this.props;
        if (!post) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Link to="/">Back</Link>
                {post.title}
                {post.body}
            </div>    
        );
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost })(PostsDetail);


