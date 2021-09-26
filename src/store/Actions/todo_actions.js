/**
 * 发送请求获取数据 load_todo
 * 获取请求成功后触发新的指令 load_todo_success
 */
import { createAction } from 'redux-actions'

export const load_todo = createAction('load_todo')
export const load_todo_success = createAction('load_todo_success')