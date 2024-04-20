import { configureStore,combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import userReducer from "./userSlice"
import searchReducer from "./searchSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer=combineReducers({user:userReducer,cart:cartReducer,search:searchReducer})
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)



export const configureAppStore=()=> configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const store=configureAppStore()
export let persistor = persistStore(store)
