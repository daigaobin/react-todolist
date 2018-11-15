import {
  CHANGE_INPUT_VALUE,
  DELETE_TODO_ITEM,
  ADD_TODO_ITEM,
  INIT_LIST,
  GET_INIT_LIST,
} from './types';

const defaultState = {
  inputValue: '123',
  list: [],
  show: true,
};
//reducer可以接收state，但是不能修改state
export default (state = defaultState, action) => {
  const newState = JSON.parse (JSON.stringify (state));
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      newState.inputValue = action.inputValue;
      return newState;
    case ADD_TODO_ITEM:
      newState.list.push (action.inputValue);
      newState.inputValue = '';
      return newState;
    case DELETE_TODO_ITEM:
      newState.list.splice (action.index, 1);
      return newState;
    case INIT_LIST:
      newState.list = action.list;
      return newState;
    default:
      return state;
  }
};
