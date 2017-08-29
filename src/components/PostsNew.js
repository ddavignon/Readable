import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { createPost, fetchCategories } from '../actions';

class PostsNew extends Component {
    
    componentWillMount() {
        this.props.fetchCategories();
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
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }
    
    render() {
        const { handleSubmit, categories } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Title"
                name="title"
                component={this.renderField}
              />
              <Field
                label="Content"
                name="body"
                component={this.renderField}
              />
              <Field
                label="Author"
                name="author"
                component={this.renderField}
              />
              <label>Category</label>
              <Field
                name="category"
                label="Category"
                component="select"
                >
                <option></option>
                {_.map(categories, category => (
                    <option
                        key={category.name}
                        value={category.name}
                    >
                        {category.name}
                    </option>
                ))}
              </Field>
              <br />
              <Button type="submit" bsStyle="primary">Submit</Button>
              <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if (!values.title) {
        errors.title = "Enter a title!"
    }
    
    if (!values.author) {
        errors.author = "Enter a name!"
    }
    
    if (!values.body) {
        errors.body = "Enter some content!"
    }
    
    if (!values.category) {
        errors.category = "Enter some content!"
    }
    
    return errors;
}

function mapStateToProps(state) {
    return { categories: state.categories }
}

export default reduxForm({
    validate,
    form: 'CreatePostForm'
})(
    connect(mapStateToProps, {
        createPost, fetchCategories
    })(PostsNew)
);
