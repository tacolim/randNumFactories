import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://localhost:8080' : 'http://localhost:8080';
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_TREES = 'GET_TREES';
export const GET_TREE = 'GET_TREE';
export const ADD_TREE = 'ADD_TREE';
export const EDIT_TREE = 'EDIT_TREE';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const updateUserPassword = (username, password, confirmPassword, newPassword, confirmNewPassword, history) => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Old passwords do not match'));
      return;
    }
    if (newPassword !== confirmNewPassword) {
      dispatch(authError('New passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/auth/reset`, { username, password, confirmPassword, newPassword, confirmNewPassword }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/TREES');
      })
      .catch(() => {
        dispatch(authError('Failed to update user password'));
      });
  };
};

export const updateUserEmail = (username, newUsername, password, confirmPassword, history) => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/auth/update`, { username, newUsername, password, confirmPassword }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/TREES');
      })
      .catch(() => {
        dispatch(authError('Failed to update user email'));
      });
  };
};

export const getTrees = () => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    axios
      .get(`${ROOT_URL}/trees`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then((res) => {
        dispatch({
          type: GET_TREES,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to get Trees'));
      });
  };
};


export const getTree = id => async (dispatch) => {
  try {
    const authToken = window.localStorage.getItem('token');
    const { data } = await axios.get(`${ROOT_URL}/tree/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    });
//    const { tree } = data;
    console.log('get tree: ', data);
  } catch (e) {
    console.log('get tree: ', e);
  }
}

export const addTree = (tree) => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    axios
      .post(`${ROOT_URL}/tree/create`, tree, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then((res) => {
        dispatch({
          type: ADD_TREE,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to add new tree'));
      });
  };
};

export const editTree = (id, tree) => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    axios
      .post(`${ROOT_URL}/tree/edit/{$id}`, tree, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then((res) => {
        dispatch({
          type: EDIT_TREE,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to edit tree'));
      });
  };
};

export const removeTree = () => (dispatch) => {
  dispatch({
    type: 'REMOVE_TREE'
  })
};