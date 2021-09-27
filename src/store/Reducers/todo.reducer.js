/**
 * 接受指令对数据进行相应的处理
 */

import { handleActions as createReducer } from 'redux-actions'
import { fromJS, setIn, getIn, mergeDeep, removeIn, updateIn } from 'immutable'
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

const initailState = fromJS({
  todos: [],
  filter: 'all'
})

// 获取 todos 任务列表成功
export default createReducer({
  [load_todo_success]: (state,action) => {
    return (
      // 第一个参数用于表示我们需要操作的数据
      // 第二个参数用于表示我们操作的是这个数据的哪个属性
      // 第三个参数用于表示我们想把这个属性设置成什么样子
      setIn(state, ['todos'], action.payload)
    )
  },

  // 添加 todos 任务成功
  // [add_todo_success]: (state, action) => ({
  //   ...state, todos: [...state.todos, action.payload]
  // }),
  
  [add_todo_success]: (state, action) => {
    return (
      /** 
       * mergeDeep 合并数据
       * -参数一：数据源
       * -参数二：要合并的数据以及被合并的值
      */
      mergeDeep(state, {todos: [action.payload]})
    )
  },

  // 删除 todos 任务成功
  /* [remove_todo_success]: (state, action) => {
    // 删除项 id 
    const id = action.payload
    // // 需要删除任务索引
    // const index = state.todos.findIndex(res => res.id === action.payload)
    const index = state.todos.findIndex(res => res.id === id)
    let todos = JSON.parse(JSON.stringify(state.todos))
    // // 删除一项
    todos.splice(index, 1)
    return {...state, todos}
  }, */
  [remove_todo_success]: (state, action) => {
    const index = getIn(state, ['todos']).findIndex(res => res.id === action.payload)
    return removeIn(state, ['todos', index])
  },

  // 修改 todos 任务状态
  [modify_todo_success]: (state, action) => {
    /* let params = action.payload.task
    let index = state.todos.findIndex(todo => todo.id === params.id)
    let todos = JSON.parse(JSON.stringify(state.todos))
    todos[index].isCompleted = params.isCompleted
    return { ...state, todos } */

    /**
     * 前两参数与删除一致
     * 参数3： 回调函数，更新成的目标值
     */
    let index = getIn(state, ['todos']).findIndex(todo => todo.id === action.payload.id)
    return updateIn(state, ['todos', index], () => action.payload)

  },

  // 筛选 todos 任务列表
  [modify_todo_filter]: (state, action) => {
    /* return {
      ...state,
    filter: action.payload
    } */
    return setIn(state, ['filter'], action.payload)
  },

  // 清除 todos 已完成任务
  [clear_todo_completed_success]: (state, action) => {
    /* let todos = JSON.parse(JSON.stringify(state.todos))
    todos = todos.filter(todo => !todo.isCompleted)
    return {
      ...state,
      todos
    } */

    let todos = getIn(state, ['todos']).filter(todo => !todo.isCompleted)
    return setIn(state, ['todos'], todos)
  },

  // 编辑 todos 任务名称
  [modify_todo_edit_success]: (state, action) => {
    /* let params = action.payload.task
    let todos = JSON.parse(JSON.stringify(state.todos))
    let index = state.todos.findIndex(todo => todo.id === params.id)
    todos[index].isEditing = params.isEditing
    return {
      ...state,
      todos
    } */
    let index = getIn(state, ['todos']).findIndex(todo => todo.id === action.payload.id)
    return updateIn(state, ['todos', index], () => action.payload)
  },

  //  修改 todos 任务名称
  [modify_todo_name_success]: (state, action) => {
    /* let todos = JSON.parse(JSON.stringify(state.todos))
    let index = state.todos.findIndex(todo => todo.id === action.payload.task.id)
    todos[index].taskName = action.payload.task.taskName
    return {
      ...state,
      todos
    } */
    let index = getIn(state, ['todos']).findIndex(todo => todo.id === action.payload.id)
    return updateIn(state, ['todos', index], () => action.payload)
  }

}, initailState) 