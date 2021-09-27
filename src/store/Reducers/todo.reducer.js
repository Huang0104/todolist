/**
 * 接受指令对数据进行相应的处理
 */

import { handleActions as createReducer } from 'redux-actions'
import {
  load_todo_success,
  add_todo_success,
  remove_todo_success,
  modify_todo_success,
  modify_todo_filter,
  clear_todo_completed_success,
  modify_todo_edit_success,
  modify_todo_name_success
} from '../Actions/todo_actions'

const initailState = {
  todos: [],
  filter: 'all'
}

// 获取 todos 任务列表成功
export default createReducer({
  [load_todo_success]: (state,action) => {
    return {
      ...state, todos: action.payload
    }
  },

  // 添加 todos 任务成功
  [add_todo_success]: (state, action) => ({
    ...state, todos: [...state.todos, action.payload]
  }),

  // 删除 todos 任务成功
  [remove_todo_success]: (state, action) => {
    console.log(state, action)
    // 删除项 id 
    const id = action.payload
    // // 需要删除任务索引
    // const index = state.todos.findIndex(res => res.id === action.payload)
    const index = state.todos.findIndex(res => res.id === id)
    let todos = JSON.parse(JSON.stringify(state.todos))
    // // 删除一项
    todos.splice(index, 1)
    return {...state, todos}
  },

  // 修改 todos 任务状态
  [modify_todo_success]: (state, action) => {
    let params = action.payload.task
    let index = state.todos.findIndex(todo => todo.id === params.id)
    let todos = JSON.parse(JSON.stringify(state.todos))
    todos[index].isCompleted = params.isCompleted
    return { ...state, todos }
  },

  // 筛选 todos 任务列表
  [modify_todo_filter]: (state, action) => ({
    ...state,
    filter: action.payload
  }),

  // 清除 todos 已完成任务
  [clear_todo_completed_success]: (state, action) => {
    let todos = JSON.parse(JSON.stringify(state.todos))
    todos = todos.filter(todo => !todo.isCompleted)
    return {
      ...state,
      todos
    }
  },

  // 编辑 todos 任务名称
  [modify_todo_edit_success]: (state, action) => {
    let params = action.payload.task
    let todos = JSON.parse(JSON.stringify(state.todos))
    let index = state.todos.findIndex(todo => todo.id === params.id)
    todos[index].isEditing = params.isEditing
    return {
      ...state,
      todos
    }
  },

  //  修改 todos 任务名称
  [modify_todo_name_success]: (state, action) => {
    let todos = JSON.parse(JSON.stringify(state.todos))
    let index = state.todos.findIndex(todo => todo.id === action.payload.task.id)
    todos[index].taskName = action.payload.task.taskName
    return {
      ...state,
      todos
    }
  }

}, initailState) 