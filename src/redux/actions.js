import {CREATE_POST, FETCH_POSTS, HIDE_ERROR, HIDE_LOADER, SHOW_ERROR, SHOW_LOADER} from "./types";

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post
  }
}

export function fetchPosts() {
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      const json = await response.json();
      setTimeout(() => {
        dispatch({ type: FETCH_POSTS, payload: json});
        dispatch(hideLoader());
      }, 2000)
    } catch (e) {
      dispatch(showError('Ошибка получения данных'));
      dispatch(hideLoader());
    }
  }
}

export function showLoader() {
  return {
    type: SHOW_LOADER
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER
  }
}

export function showError(text) {
  return dispatch => {
    dispatch({
      type: SHOW_ERROR,
      payload: text
    });
    setTimeout(() => dispatch(hideError()), 3000);
  };
}

export function hideError() {
  return {
    type: HIDE_ERROR
  }
}