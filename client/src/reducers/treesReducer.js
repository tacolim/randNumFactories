import { GET_TREES, ADD_TREE, EDIT_TREE, DELETE_TREE } from '../actions';

export default (trees = [], action) => {
  switch (action.type) {
    case GET_TREES:
      return action.payload.data;
    case ADD_TREE:
      return action.payload.data;
    case EDIT_TREE:
      return action.payload.data;
    case DELETE_TREE:
      return action.payload.data;
    default:
      return trees;
  }
};