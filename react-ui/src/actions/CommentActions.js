import _ from 'lodash'
import axios from 'axios';
import {
    FETCH_POST_COMMENTS,
    FETCH_POST_COMMENTS_COUNT,
    FETCH_COMMENT_POST,
    CREATE_COMMENT_POST,
    EDIT_COMMENT_POST,
    DELETE_COMMENT_POST,
    VOTE_COMMENT
} from './types';
import {
    ROOT_URL,
    AUTH_HEADERS,
    guid
} from './constants';


axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;


/*
Actions for comments
*/

export function fetchPostComments(postId) {
    return dispatch => {
        axios.get(`${ROOT_URL}/posts/${postId}/comments`)
            .then(res => {
                dispatch({ type: FETCH_POST_COMMENTS, payload: res.data })
            })
    }
}

export function fetchPostCommentsCount(postId, callback) {
    return dispatch => {
        axios.get(`${ROOT_URL}/posts/${postId}/comments`)
            .then(res => {
                const comments = _.filter(res.data, comment => !comment.deleted);
                const count = Object.keys(comments).length;
                const data = { postId, count }
                callback(data);
                dispatch({ type: FETCH_POST_COMMENTS_COUNT, payload: data });
        });
    }
}

export function fetchCommentPost(id) {
    return dispatch => {
        axios.get(`${ROOT_URL}/comments/${id}`)
            .then(res => dispatch({ type: FETCH_COMMENT_POST, payload: res.data }));
        
    }
}

export function createPostComment(values, parentId, callback) {
    const { body, author } = values;

    const data = {
        id: guid(),
        parentId,
        timestamp: Date.now(),
        body,
        author
    }
        
    return dispatch => {
        axios.post(`${ROOT_URL}/comments`, data)
            .then(res => {
                callback();
                dispatch({ type: CREATE_COMMENT_POST, payload: res.data });
            });
        
    }
}

export function editPostComment(id, values, callback) {
  
    return dispatch => {
        axios.put(`${ROOT_URL}/comments/${id}`, values)
            .then(res => {
                callback();
                dispatch({ type: EDIT_COMMENT_POST, payload: res.data })
            });
        
    }
}


export function deleteCommentPost(id, callback) {
     return dispatch => {
        axios.delete(`${ROOT_URL}/comments/${id}`)
            .then(res => {
                callback();
                dispatch({ type: DELETE_COMMENT_POST, payload: res.data });
            });        
    }
}

export function voteForComment(id, vote) {
    return dispatch => {
        axios.post(`${ROOT_URL}/comments/${id}`, { option: vote })
            .then(res => dispatch({ type: VOTE_COMMENT, payload: res.data }))
            .catch(err => console.log(err))
            
    }
}
