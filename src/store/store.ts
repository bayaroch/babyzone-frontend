import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createWrapper, MakeStore } from 'next-redux-wrapper'
import reducer from './reducers'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from './storage'

export interface AppState {
  metadata: any
  auth: any
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
      middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    })
  } else {
    const persistConfig = {
      key: 'auth',
      whitelist: ['auth'],
      storage,
    }

    const persistedReducer = persistReducer(persistConfig, reducer)
    const store = configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    })

    return store
  }
}

export const storeWrapper = createWrapper(initStore)
export type StoreType = ReturnType<typeof initStore>
