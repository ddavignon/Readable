import React, { Component } from 'react';
import Modal from 'react-modal';
import PostsMain from './PostsMain';

class App extends Component {
  state = {
    createPostModalOpen: false
  }
  
  createPost = () => this.setState(() => ({ createPostModalOpen: true }))
  
  closeCreatePostModal = () => this.setState(() => ({ createPostModalOpen: false }))

  render() {
    return (
      <div className="App">
        <button onClick={this.createPost}>Create Post</button>
        <PostsMain />
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
      </div>
    );
  }
}

export default App;
