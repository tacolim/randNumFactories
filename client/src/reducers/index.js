import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import TreesReducer from './treesReducer';
import TreeReducer from './treeReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  trees: TreesReducer,
  tree: TreeReducer,
  router: routerReducer,
});

export default rootReducer;