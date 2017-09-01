import _ from 'lodash'
import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
export const DELETE_POST = 'delete_post';
export const VOTE_POST = 'vote_post';
export const POST_SORT_ORDER = 'post_sort_order';

export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_CATEGORY_POSTS = 'fetch_category_posts';

export const FETCH_POST_COMMENTS = 'fetch_post_comments';
export const FETCH_POST_COMMENTS_COUNT = 'fetch_post_comments_count';
export const FETCH_COMMENT_POST = 'fetch_comment_post';
export const CREATE_COMMENT_POST = 'create_comment_post';
export const EDIT_COMMENT_POST = 'edit_comment_post';
export const DELETE_COMMENT_POST = 'delete_comment_post';
export const VOTE_COMMENT = 'vote_comment';

const ROOT_URL = '';
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
