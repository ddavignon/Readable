import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { createPostComment } from '../actions';


class CommentsNew extends Component {
    
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
        const { category, id } = this.props.match.params
        this.props.createPostComment(values, id, () => {
            this.props.history.push(`/${category}/${id}`);
        });
    }
    
    render() {
        const {
            handleSubmit,
            match: {
                params: {
                    category,
                    id
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
              <Field
                label="Author"
                name="author"
                component={this.renderField}
              />
              <Button type="submit" bsStyle="primary">Submit</Button>
              <Link to={`/${category}/${id}`} className="btn btn-danger">Cancel</Link>
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

export default reduxForm({
    validate,
    form: 'AddCommentForm'
})(
    connect(null, {
        createPostComment
    })(CommentsNew)
);
