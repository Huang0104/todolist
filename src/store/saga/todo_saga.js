/**
 * 操作异步请求
 * 重新发送的指令
 */
import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
import { load_todo, load_todo_success, add_todo_success, add_todo } from '../Actions/todo_actions'

function* load_todo_data() {
  let todos = yield axios.get('http://localhost:3005/api/todos').then(res => res.data)
  yield put(load_todo_success(todos))
}
function* add_todo_data(action) {
  let tasks = yield axios.post('http://localhost:3005/api/todos', {taskName: action.payload}).then(res => res.data)
  yield put(add_todo_success(tasks.task))
}
export default function* todoSaga() {
  // 获取 todos 任务列表操作
  yield takeEvery(load_todo, load_todo_data)
  // 新增任务操作
  yield takeEvery(add_todo, add_todo_data)
}