import _ from 'lodash'
import axios from 'axios';
import {
    FETCH_CATEGORIES,
    FETCH_CATEGORY_POSTS
} from './types';
import {
    ROOT_URL,
    AUTH_HEADERS,
    guid
} from './constants';


axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

/*
Actions for categories
*/

export function fetchCategories() {
    
return dispatch => {
    axios.get(`${ROOT_URL}/categories`)
        .then(res => dispatch(fetchCategoriesSuccess(res.data)));
    
}
}

function fetchCategoriesSuccess(data) {
return {
    type: FETCH_CATEGORIES,
    payload: data
};
}

export function fetchCategoryPosts(category) {
return dispatch => {
    axios.get(`${ROOT_URL}/${category}/posts`)
        .then(res => dispatch({ type: FETCH_CATEGORY_POSTS, payload: res.data }))
        .catch(err => console.log(err));
}
}