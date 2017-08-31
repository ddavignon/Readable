import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import CategoriesReducer from './reducer_categories';
import CommentsReducer from './reducer_comments';
import PostsSortReducer from './reducer_posts_sort';


const rootReducer = combineReducers({
    posts: PostsReducer,
    categories: CategoriesReducer,
    comments: CommentsReducer,
    postsOrder: PostsSortReducer,
    form: formReducer
});

export default rootReducer;
