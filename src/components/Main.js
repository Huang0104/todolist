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
    // 执行删除指令
    if(window.confirm('确定删除该任务吗？')){
      this.props.remove_todo(id)
    }
  }

  render() {
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
          {
            this.props.todos.map(item => {
              return (
                <li key={item.id} className={item.isCompleted ? 'completed': ''}>
                  <div className="view">
                    <input className="toggle" type="checkbox" defaultChecked={item.isCompleted} onChange={(ev)=>{this.props.modify_todo({id: item.id, isCompleted: ev.target.checked})}}/>
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
    todos: modofyTodoFilter(state.todoReducer.todos, state.todoReducer.filter)
  }
}
// 自定生成触发 Action 函数
const mapDistchToProps = dispatch => {
  return {
    ...bindActionCreators(todoActions, dispatch)
  }
}


// 筛选函数
// todos 是之前的数据
// filter 是需要筛选数据
const modofyTodoFilter = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'active':
      return todos.filter(todo => !todo.isCompleted)
    case 'completed':
      return todos.filter(todo => todo.isCompleted)
    default: 
      return todos
  }
}

export default connect(mapStoreToProps, mapDistchToProps)(Main)
