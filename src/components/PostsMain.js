import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';

class PostsMain extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }
    
    render() {
        console.log('state props', this.props)
        return (
            <div>Hello Posts</div>
        );
    }
}

function mapStateToProps (state) {
    console.log(state);
    return { posts: state.posts.all }
}

export default connect(mapStateToProps, { fetchPosts })(PostsMain);
