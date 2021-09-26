import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoActions from '../store/Actions/todo_actions'

class Main extends Component {

  // 获取 todos 任务列表
  componentDidMount() {
    this.props.load_todo()
  }

  // 删除任务
  removeTodo(id) {
    console.log(id)
  }

  render() {
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
          {
            this.props.todos.map(item => {
              return (
                <li key={item.id}>
                  <div className="view">
                    <input className="toggle" type="checkbox"/>
                    <label>{item.taskName}</label>
                    <button onClick={this.removeTodo.bind(this, item.id)} className="destroy"></button>
                  </div>
                  <input className="edit" />
                </li>
              )
            })
          }
        </ul>
      </section>
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
export default connect(mapStoreToProps, mapDistchToProps)(Main)

