import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';

class App extends Component {
  state = {
    createPostModalOpen: false
  }
  
  componentWillMount() {
    fetch("https://udacity-react-project2-dustindavignon.c9users.io:8081/categories", { headers: { 'Authorization': 'whatever-you-want' }})
      .then((res) => res.json())
      .then(({ categories }) => categories.map(category => console.log(category)))
      
  }

  createPost = () => this.setState(() => ({ createPostModalOpen: true }))
  
  closeCreatePostModal = () => this.setState(() => ({ createPostModalOpen: false }))

  render() {
    return (
      <div className="App">
        <button onClick={this.createPost}>Create Post</button>
        <Modal
          overlayClassName='overlay'
          isOpen={this.state.createPostModalOpen}
          onRequestClose={this.closeCreatePostModal}
          contentLabel='Modal'
        >
          Hello Modal
          <button onClick={this.closeCreatePostModal}>Close modal</button>
        </Modal>
      </div>
    );
  }
}

export default App;
