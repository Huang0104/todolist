/**
 * 接受指令对数据进行相应的处理
 */

import { handleActions as createReducer } from 'redux-actions'
import { load_todo_success } from '../Actions/todo_actions'

const initailState = {
  todos: []
}

export default createReducer({
  [load_todo_success]: (state,action) => ({
    todos: action.payload
  })
}, initailState) 