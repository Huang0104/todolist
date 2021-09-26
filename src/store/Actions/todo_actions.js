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

// 修改 todos 任务状态
export const modify_todo = createAction('modify_todo')
export const modify_todo_success = createAction('modify_todo_success')

// 筛选 todos 任务列表
export const modify_todo_filter = createAction('modify_todo_filter')

// 清除 todos 已完成任务
export const clear_todo_completed = createAction('clear_todo_completed')
export const clear_todo_completed_success = createAction('clear_todo_completedsuccess')