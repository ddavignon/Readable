import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { fetchCommentPost, deleteCommentPost } from '../actions';

class CommentsDetail extends Component {
    componentWillMount() {
        this.props.fetchCommentPost(this.props.match.params.id);
    }

    deleteButtonPress() {
        this.props.deleteCommentPost(this.props.match.params.id, () => {
            this.props.history.push(`/posts/${this.props.comment.parentId}`)
        });
    }
    
    render() {
        const { comment } = this.props;
        if (!comment) {
            return <div>Loading...</div>;
        }
        const  { id, title, author, category, body } = comment;
        return (
            <div>
                <Link to="/"><Button>Back</Button></Link>
                <Link to={`/posts/edit/${id}`}>
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
                    Delete Comment
                </Button>
                <h2>{title}</h2>
                <h4>{author} <small>{category}</small></h4>
                <p>{body}</p>
            </div>    
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { comment: state.comments[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchCommentPost, deleteCommentPost })(CommentsDetail);


