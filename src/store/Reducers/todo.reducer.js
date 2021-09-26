/**
 * 接受指令对数据进行相应的处理
 */

import { handleActions as createReducer } from 'redux-actions'
import { load_todo_success, add_todo_success, remove_todo_success, modify_todo_success } from '../Actions/todo_actions'

const initailState = {
  todos: []
}

// 获取 todos 任务列表成功
export default createReducer({
  [load_todo_success]: (state,action) => {
    return {
      todos: action.payload
    }
  },

  // 添加 todos 任务成功
  [add_todo_success]: (state, action) => ({
    todos: [...state.todos, action.payload]
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
    return {todos}
  },

  // 修改 todos 任务状态
  [modify_todo_success]: (state, action) => {
    let params = action.payload.task
    let index = state.todos.findIndex(todo => todo.id === params.id)
    let todos = JSON.parse(JSON.stringify(state.todos))
    todos[index].isCompleted = params.isCompleted
    return { todos }
  }

}, initailState) 