 /**
  * 拆分、合并 Reducer
  */
 import { combineReducers } from 'redux'
 import todoReducer from './todo.reducer'

 export default combineReducers({todoReducer: todoReducer})