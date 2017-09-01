import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    ListGroupItem
} from 'react-bootstrap';
import { capitalize } from '../utils/helpers'
import {
    fetchCategories,
    fetchCategoryPosts,
    fetchPosts
} from '../actions';


class CategoriesList extends Component {
    
    componentWillMount() {
        this.props.fetchCategories();
    }
    
    renderList() {
        const { categories, fetchCategoryPosts } = this.props;
        if (categories) {
             return _.map(categories, category => {
                return (
                    <ListGroupItem
                        key={category.path}
                    >
                        <Link
                            to={`/${category.path}`}
                            onClick={() => fetchCategoryPosts(category.path)}
                        >
                            {capitalize(category.name)}
                        </Link>
                    </ListGroupItem>
                );
            });
        }
        return (
            <div>Loading</div>
        );
    }
    
    render() {
        return (
            <div>
                <ListGroupItem>
                    <Link to="/">All</Link>
                </ListGroupItem>
                <div>{this.renderList()}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { categories: state.categories }
}

export default connect(mapStateToProps, {
    fetchCategories, fetchPosts, fetchCategoryPosts
})(CategoriesList);
