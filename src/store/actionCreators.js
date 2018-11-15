import {
  CHANGE_INPUT_VALUE,
  DELETE_TODO_ITEM,
  ADD_TODO_ITEM,
  INIT_LIST,
  GET_INIT_LIST,
} from './types';
import Axios from 'axios';

export const getInputChangeAction = inputValue => ({
  type: CHANGE_INPUT_VALUE,
  inputValue,
});

export const getAddTodoItemAction = inputValue => ({
  type: ADD_TODO_ITEM,
  inputValue,
});

export const getDeleteTodoItemAction = index => ({
  type: DELETE_TODO_ITEM,
  index,
});

export const initListAction = list => ({
  type: INIT_LIST,
  list,
});

/**
 * 使用redux-thunk中间件方式处理Ajax请求
 */
export const getListAction = () => {
  return dispatch => {
    Axios.get (
      'http://www.mocky.io/v2/5be2be742f00001000ca20b8'
    ).then (resp => {
      dispatch (initListAction (resp.data));
    });
  };
};

/**
 * 使用redux-saga中间件方式处理Ajax请求
 */
export const getInitListAction = () => ({
  type: GET_INIT_LIST,
});

