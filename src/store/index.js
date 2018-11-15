import reducer from './reducer';
//1、redux-thunk中间件处理Ajax请求
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

//2、redux-saga中间件处理Ajax请求
import createSagaMiddleware from 'redux-saga';
import mySagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeWithDevTools(
  //applyMiddleware(thunk),
  applyMiddleware(sagaMiddleware)
));
sagaMiddleware.run(mySagas);

export default store;
