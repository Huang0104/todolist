/**
 * 拆分、合并 saga
 */
import { all } from 'redux-saga/effects'
import todoSage from './todo_saga'

export default function* rootSage() {
  yield all([todoSage()])
}
