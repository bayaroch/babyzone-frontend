import { combineReducers, Reducer } from 'redux'
import metadata from '@store/metadata'
import posts from '@store/posts'
import { HYDRATE } from 'next-redux-wrapper'
import taxonomy from '@store/taxonomy'
import page from '@store/page'

export interface AppState {
  metadata: any
  posts: any
  taxonomy: any
  page: any
}

const combinedReducers = combineReducers({
  metadata: metadata.reducer,
  posts: posts.reducer,
  taxonomy: taxonomy.reducer,
  page: page.reducer,
})

const reducer: Reducer<any> = (state, action) => {
  if (action.type === HYDRATE) {
    /* client state will be overwritten
     * by server or static state hydation.
     * Implement state preservation as needed.
     * see: https://github.com/kirill-konshin/next-redux-wrapper#server-and-client-state-separation
     */
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  }
  return combinedReducers(state, action)
}

export default reducer

export type RootState = ReturnType<typeof reducer>
