export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
export const DELETE_POST = 'delete_post';
export const UPVOTE_POST = 'upvote_post';
export const DOWNVOTE_POST = 'downvote_post';

const ROOT_URL = 'https://udacity-react-project2-dustindavignon.c9users.io:8081';
const AUTH_HEADERS = { headers: { 'Authorization': 'whatever-you-want' }};

export function fetchPosts() {
    
    const request = fetch(`${ROOT_URL}/posts`, AUTH_HEADERS);
        
    return dispatch => {
        request
            .then(res => res.json())
            .then(data => dispatch(fetchPostsSuccess(data)));
        
    }
}

export function fetchPost(id) {
    const request = fetch(`${ROOT_URL}/posts/${id}`, AUTH_HEADERS);
        
    return dispatch => {
        request
            .then(res => res.json())
            .then(data => dispatch(fetchPostSuccess(data)));
        
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


