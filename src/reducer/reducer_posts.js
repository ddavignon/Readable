import _ from 'lodash';
import  {
    FETCH_POSTS,
    FETCH_POST,
    EDIT_POST,
    DELETE_POST
} from '../actions';

const INITIAL_STATE = {
    all: [],
    post: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                all: action.payload
            }
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            }
        case EDIT_POST:
            return {
                ...state,
                post: action.payload
            }
        case DELETE_POST:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}