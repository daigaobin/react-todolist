import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {GET_INIT_LIST} from './types';
import Axios from 'axios';
import {initListAction} from './actionCreators';

function* getInitList () {
    try{
        const resp = yield Axios.get ('http://www.mocky.io/v2/5be2be742f00001000ca20b8');
        yield put(initListAction (resp.data));
    }catch(e) {
        console.log('请求失败');
    }
}

function* mySaga () {
  yield takeLatest (GET_INIT_LIST, getInitList);
}

export default mySaga;
