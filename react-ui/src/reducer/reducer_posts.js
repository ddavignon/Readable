import _ from 'lodash';
import  {
    FETCH_POSTS,
    FETCH_POST,
    EDIT_POST,
    DELETE_POST,
    FETCH_CATEGORY_POSTS,
    VOTE_POST
} from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload, 'id')
        case FETCH_POST:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case EDIT_POST:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case DELETE_POST:
            return _.omit(state, action.payload);
        case VOTE_POST:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case FETCH_CATEGORY_POSTS:
            return _.mapKeys(action.payload, 'id');
        default:
            return state;
    }
}