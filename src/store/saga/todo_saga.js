/**
 * 操作异步请求
 * 重新发送的指令
 * takeEvery  接收指令
 * put 相当于 dispatch 用于触发 action 函数
 */
import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
import {
  load_todo,
  load_todo_success,
  add_todo_success,
  add_todo,
  remove_todo,
  remove_todo_success,
  modify_todo,
  modify_todo_success,
  clear_todo_completed,
  clear_todo_completed_success,
  modify_todo_edit,
  modify_todo_edit_success,
  modify_todo_name,
  modify_todo_name_success
} from '../Actions/todo_actions'

// 获取 todos 任务列表
function* load_todo_data() {
  let todos = yield axios.get('http://localhost:3005/api/todos').then(res => res.data)
  yield put(load_todo_success(todos))
}

// 添加 todos 任务
function* add_todo_data(action) {
  // 发送异步请求
  let tasks = yield axios.post('http://localhost:3005/api/todos', {taskName: action.payload}).then(res => res.data)
  // 重新发送新的指令
  yield put(add_todo_success(tasks.task))
}

// 根据 id 删除 todos 任务
function* remove_todo_data(action) {
  // params 将 id 拼接到路径上，才能删除
  // let res = yield axios.delete('http://localhost:3005/api/todos',{id: action.payload}).then(res =>　res.data) 错误的传参
  let res = yield axios.delete('http://localhost:3005/api/todos',{params:{id: action.payload}}).then(res =>　res.data)
  yield put(remove_todo_success(res.tasks.id))
}

 // 修改 todos 任务状态
 function* modify_todo_data(action) {
   let res = yield axios.put('http://localhost:3005/api/todos/isCompleted', action.payload).then(res => res.data)
   yield put(modify_todo_success(res))

 }

 // 清除 todos 已完成任务
 function* clear_todo_data() {
   yield axios.delete('http://localhost:3005/api/todos/clearCompleted')
   yield put(clear_todo_completed_success())
 }

 // 编辑 todos 任务名称
 function* edit_todo_data(action) {
   const res = yield axios.put('http://localhost:3005/api/todos/isEditing', action.payload).then(res => res.data)
   yield put(modify_todo_edit_success(res))
 }

 // 修改 todos 任务名称
 function* name_todo_data(action) {
   const res = yield axios.put('http://localhost:3005/api/todos', action.payload).then(res => res.data)
   yield put(modify_todo_name_success(res))
 }

export default function* todoSaga() {
  // 获取 todos 任务列表操作
  yield takeEvery(load_todo, load_todo_data)
  // 新增任务操作
  yield takeEvery(add_todo, add_todo_data)
  // 删除 任务 操作
  yield takeEvery(remove_todo, remove_todo_data)
  // 修改 任务 状态
  yield takeEvery(modify_todo, modify_todo_data)
  // 清除 已完成任务
  yield takeEvery(clear_todo_completed, clear_todo_data)
  // 编辑 任务 名称
  yield takeEvery(modify_todo_edit, edit_todo_data)
  // 修改 任务 名称
  yield takeEvery(modify_todo_name, name_todo_data)
}