import { ASYNC_INCREMENT } from '../types/counter'
import { createAction } from 'redux-actions'

export const asyncInc = createAction(ASYNC_INCREMENT, (state) => {
  return new Promise(resolve => {
    console.log(state,'state')
    setTimeout(() => {
      resolve({name:'zfx'})
    }, 1000)
  })
})