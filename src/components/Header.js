import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as createActions from '../store/Actions/todo_actions'
import { get, getIn } from 'immutable'
/**
 */

class Header extends Component {

  // 回车键弹起事件
  addTask = (e) => {
    if (e.keyCode === 13) {
      // 1、获取输入的值
      const taskName = e.target.value
      if (taskName.trim().length === 0) {
        alert('请输入任务名称')
        return
      }
      // 2、触发新增任务的指令
      this.props.add_todo(taskName)
      // 3、清空输入框
      e.target.value =''
    }
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input onKeyUp={this.addTask} className="new-todo" placeholder="还有什么任务没有完成?" autoFocus />
      </header>
    )
  }
}
// 组件与 store
const mapStoreToProps = state => {
  return {
    todos: get(state.todoReducer, ['todos'])
  }
}
// 组件与 dispatch
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(createActions, dispatch)
})

export default connect(mapStoreToProps, mapDispatchToProps)(Header)