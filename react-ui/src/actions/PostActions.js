import _ from 'lodash'
import axios from 'axios';
import {
    FETCH_POSTS,
    FETCH_POST,
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    VOTE_POST,
    POST_SORT_ORDER
} from './types';
import {
    ROOT_URL,
    AUTH_HEADERS,
    guid
} from './constants';


axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

  
/*
Actions for posts
*/

export function fetchPosts() {
        
    return dispatch => {
        axios.get(`${ROOT_URL}/posts`)
            .then(res => dispatch(fetchPostsSuccess(res.data)));
        
    }
}

export function fetchPost(id) {
        
    return dispatch => {
        axios.get(`${ROOT_URL}/posts/${id}`)
            .then(res => dispatch(fetchPostSuccess(res.data)));
        
    }
}

export function createPost(values, callback) {
    const { title, body, author, category } = values;

    const data = {
        id: guid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }
        
    return dispatch => {
        axios.post(`${ROOT_URL}/posts`, data)
            .then(res => {
                callback();
                dispatch(createPostSuccess(res.data));
            });
        
    }
}

export function editPost(id, values, callback) {

    return dispatch => {
        axios.put(`${ROOT_URL}/posts/${id}`, values)
            .then(res => {
                callback();
                dispatch(editPostSuccess(res.data))
            });
        
    }
}

export function deletePost(id, callback) {

    return dispatch => {
        axios.delete(`${ROOT_URL}/posts/${id}`)
            .then(res => {
                callback();
                dispatch(deletePostSuccess(id));
            });        
    }
}

export function voteForPost(id, vote) {
    return dispatch => {
        axios.post(`${ROOT_URL}/posts/${id}`, { option: vote })
            .then(res => dispatch({ type: VOTE_POST, payload: res.data }))
    }
}

export function postSortOrder(sortType) {
    return {
        type: POST_SORT_ORDER,
        payload: sortType
    }
}

function fetchPostsSuccess(data) {
    return {
        type: FETCH_POSTS,
        payload: data
    };
}

function fetchPostSuccess(data) {
    return {
        type: FETCH_POST,
        payload: data
    };
}

function createPostSuccess(data) {
    return {
        type: CREATE_POST,
        payload: data
    };
}

function editPostSuccess(data) {
    return {
        type: EDIT_POST,
        payload: data
    }
}

function deletePostSuccess(data) {
    return {
        type: DELETE_POST,
        payload: data
    }
}
