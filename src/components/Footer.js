import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoActions from '../store/Actions/todo_actions'

class Footer extends Component {
  render() {
    let taskLen = this.props.todos.filter(todo => !todo.isCompleted)
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{taskLen.length}</strong> item left
				</span>
        <ul className="filters">
          <li>
            <span onClick={()=>{this.props.modify_todo_filter('all')}}>All</span>
          </li>
          <li>
            <span onClick={()=>{this.props.modify_todo_filter('active')}}>Active</span>
          </li>
          <li>
            <span onClick={()=>{this.props.modify_todo_filter('completed')}}>Completed</span>
          </li>
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    )
  }
}

// 获取 store 数据
const mapStoreToProps = state => {
  return {
    todos: state.todoReducer.todos
  }
}
// 自定生成触发 Action 函数
const mapDistchToProps = dispatch => {
  return {
    ...bindActionCreators(todoActions, dispatch)
  }
}

export default connect(mapStoreToProps, mapDistchToProps)(Footer)
