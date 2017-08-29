import _ from 'lodash';
import  {
    FETCH_POST_COMMENTS,
    FETCH_COMMENT_POST,
    EDIT_COMMENT_POST,
    DELETE_COMMENT_POST,
    VOTE_COMMENT
} from '../actions';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POST_COMMENTS:
            return _.mapKeys(action.payload, 'id');
        case FETCH_COMMENT_POST:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case EDIT_COMMENT_POST:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_COMMENT_POST:
            return _.omit(state, action.payload);
        case VOTE_COMMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        default:
            return state;
    }
}