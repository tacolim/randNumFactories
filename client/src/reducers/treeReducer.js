import { GET_TREE } from '../actions';

const defaultState = {
  tree: {},
  id: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'REMOVE_TREE':
      return { ...defaultState };
    case GET_TREE:
      return action.payload.data;
    default:
      return state;
  }
};