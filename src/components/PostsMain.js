import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Modal from 'react-modal';
import { fetchPosts } from '../actions/index';

class PostsMain extends Component {
    state = {
        createPostModalOpen: false
    }
    
    componentWillMount() {
        this.props.fetchPosts();
    }
  
    createPost = () => this.setState(() => ({ createPostModalOpen: true }))
  
    closeCreatePostModal = () => this.setState(() => ({ createPostModalOpen: false }))
    
    renderPosts() {
        return (this.props.posts).map(post => {
            return (
                <ListGroupItem
                    header={post.title}
                    onClick={() => this.props.history.push(`posts/${post.id}`)}
                    key={post.id}
                >
                    <div>{post.timestamp} by {post.author}</div> 
                    <div>{post.body}</div>
                    <div>{post.category} {post.voteScore}</div>
                </ListGroupItem>
            );
        });
    }
    
    render() {
        return (
            <div>
                <button onClick={this.createPost}>Create Post</button>
                <Modal
                  overlayClassName='overlay'
                  isOpen={this.state.createPostModalOpen}
                  onRequestClose={this.closeCreatePostModal}
                  contentLabel='Modal'
                >
                  <label>Title</label>
                  <input
                      className='title-input'
                      type='text'
                      ref={(input) => this.input = input}
                    />
                    <label>Body</label>
                  <input
                      className='body-input'
                      type='text'
                      ref={(input) => this.input = input}
                    />
                    <label>Author</label>
                    <input
                        className='author-input'
                        type='text'
                        ref={(input) => this.input = input}
                      />
                  <button onClick={this.closeCreatePostModal}>Close modal</button>
                </Modal>
                <ListGroup componentClass="ul">
                    {this.renderPosts()}
                </ListGroup>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return { posts: state.posts.all }
}

export default connect(mapStateToProps, { fetchPosts })(PostsMain);
