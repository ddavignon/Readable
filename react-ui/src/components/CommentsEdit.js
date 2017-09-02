import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCommentPost, editPostComment } from '../actions';


class CommentsEdit extends Component {
    
    componentWillMount() {
        this.props.fetchCommentPost(this.props.match.params.id);
    }
    
    componentDidMount() {
        this.handleInitialize();
    }
    
    handleInitialize() {
        if (this.props.comment) {
          const initData = {
            "body": this.props.comment.body
          };
          this.props.initialize(initData);
        }
    }
    
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error': null;
        
        return (
            <FormGroup validationState={className}>
                <label>{field.label}</label>
                <FormControl
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </FormGroup>
        );
    }
    
    onSubmit(values) {
        const { category, postId, id } = this.props.match.params
        this.props.editPostComment(id, values, () => {
            this.props.history.push(`/${category}/${postId}`);
        });
    }
    
    render() {
        const {
            handleSubmit,
            comment,
            match: {
                params: {
                    category,
                    postId
                }
            }
        } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Comment"
                name="body"
                component={this.renderField}
              />
              <ControlLabel>Author</ControlLabel>
                <FormControl.Static>{comment ? comment.author : ''}</FormControl.Static>
                <Button type="submit" bsStyle="primary">Update</Button>
              <Link to={`/${category}/${postId}`} className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if (!values.author) {
        errors.author = "Enter a name!"
    }
    
    if (!values.body) {
        errors.body = "Enter a comment!"
    }

    return errors;
}

function mapStateToProps(state, ownProps) {
    return { comment: state.comments[ownProps.match.params.id] }
}


export default reduxForm({
    validate,
    form: 'EditCommentForm'
})(
    connect(mapStateToProps, {
        fetchCommentPost, editPostComment
    })(CommentsEdit)
);
