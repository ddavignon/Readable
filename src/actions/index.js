import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
export const DELETE_POST = 'delete_post';
export const UPVOTE_POST = 'upvote_post';
export const DOWNVOTE_POST = 'downvote_post';

const ROOT_URL = 'https://udacity-react-project2-dustindavignon.c9users.io:8081';
const AUTH_HEADERS = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', };

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() + s4();
}

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
    const data = {
        id: guid(),
        timestamp: Date.now(),
        title: values.title,
        body: values.body,
        author: values.author,
        deleted: false,
        category: "react"
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
    
    console.log(id, values);

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