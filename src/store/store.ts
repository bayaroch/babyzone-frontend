import { configureStore } from '@reduxjs/toolkit'
import { createWrapper, MakeStore } from 'next-redux-wrapper'
import reducer from './reducers'
// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'

export interface AppState {
  metadata: any
  posts: any
  taxonomy: any
}

/**
 * initStore
 * Initialise and export redux store
 */
const initStore: MakeStore<AppState> = () => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    return configureStore({
      reducer,
    })
  } else {
    const store = configureStore({
      reducer: reducer,
    })

    return store
  }
}

export const storeWrapper = createWrapper(initStore)
export type StoreType = ReturnType<typeof initStore>
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
