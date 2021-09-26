/**
 * 接受指令对数据进行相应的处理
 */

import { handleActions as createReducer } from 'redux-actions'
import { load_todo_success, add_todo_success } from '../Actions/todo_actions'

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

  // 添加任务成功
  [add_todo_success]: (state, action) => ({
    todos: [...state.todos, action.payload]
  })
}, initailState) 