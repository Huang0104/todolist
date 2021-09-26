import { createStore, applyMiddleware } from 'redux'
import rootReducer from './Reducers/root.reducer'
import createSagaMiddleware from 'redux-saga'
// import rootSage from './saga/root_saga'
import todoSaga from './saga/todo_saga'
/**
 * 完成 store 的创建
 * 中间件的注册
 */
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(todoSaga)
console.log(store.getState())
export default store