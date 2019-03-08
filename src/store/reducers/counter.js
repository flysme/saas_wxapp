import { handleActions } from 'redux-actions'
import { INCREMENT, DECREMENT, ASYNC_INCREMENT } from '../types/counter'

export default handleActions({
  [INCREMENT] (state) {
    return {
      ...state,
      num: state.num + 1
    }
  },
  [DECREMENT] (state) {
    return {
      ...state,
      num: state.num - 1
    }
  },
  [ASYNC_INCREMENT] (state, action) {
    console.log(action.payload,'action.payload')
    return {
      ...state,
      asyncNum: state.asyncNum + 1
    }
  }
}, {
  num: 0,
  asyncNum: 0
})