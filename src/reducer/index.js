import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import CategoriesReducer from './reducer_categories';

const rootReducer = combineReducers({
    posts: PostsReducer,
    categories: CategoriesReducer,
    form: formReducer
});

export default rootReducer;
