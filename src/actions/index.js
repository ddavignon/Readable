export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
export const DELETE_POST = 'delete_post';
export const UPVOTE_POST = 'upvote_post';
export const DOWNVOTE_POST = 'downvote_post';

const ROOT_URL = 'https://udacity-react-project2-dustindavignon.c9users.io:8081'

export function fetchPosts() {
    
    const request = fetch(`${ROOT_URL}/posts`, { headers: { 'Authorization': 'whatever-you-want' }});
        
    return dispatch => {
        request
            .then(res => res.json())
            .then(data => dispatch(fetchPostsSuccess(data)));
        
    }
}

function fetchPostsSuccess(data) {
        return {
        type: FETCH_POSTS,
        payload: data
    };
}

