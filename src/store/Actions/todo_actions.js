/**
 * 发送请求获取数据 load_todo
 * 获取请求成功后触发新的指令 load_todo_success
 */
import { createAction } from 'redux-actions'

// 获取 todos 任务列表相关指令
export const load_todo = createAction('load_todo')
export const load_todo_success = createAction('load_todo_success')

// 获取 新增任务 相关指令
export const add_todo = createAction('add_todo')
export const add_todo_success = createAction('add_todo_success')

// 删除 任务 指令
export const remove_todo = createAction('remove_todo')
export const remove_todo_success = createAction('remove_todo_success')