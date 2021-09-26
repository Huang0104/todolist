/**
 * 操作异步请求
 * 重新发送的指令
 */
import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
import { load_todo, load_todo_success } from '../Actions/todo_actions'

function* load_todo_data() {
  let todos = yield axios.get('http://localhost:3005/api/todos').then(res => res.data)
  console.log(todos)
  yield put(load_todo_success(todos))
}
export default function* todoSaga() {
  yield takeEvery(load_todo, load_todo_data)
}