import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ListGroupItem
} from 'react-bootstrap';
import { fetchCategories } from '../actions';


class CategoriesList extends Component {
    
    componentWillMount() {
        this.props.fetchCategories();
    }
    
    renderList() {
        const { categories } = this.props;
        if (categories) {
             return (categories).map(category => {
                return (
                    <ListGroupItem
                        key={category.path}
                    >
                        {category.name}
                    </ListGroupItem>
                );
            });
        }
        return <div>Loading</div>;
    }
    
    render() {
        return (
            <div>{this.renderList()}</div>
        );
    }
}

function mapStateToProps(state) {
    return { categories: state.categories.all }
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);