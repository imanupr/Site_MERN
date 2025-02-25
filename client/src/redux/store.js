import {configureStore} from '@reduxjs/toolkit'
import  userReducer  from './features/userSlice'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'




export const persistConfig = {
    key:'root',
    storage,
    whitelist:['user']
}

const persistedReducer = persistReducer(persistConfig,userReducer)
export const store = configureStore({
    reducer:{
        user:persistedReducer,
    },
   
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export const persistor = persistStore(store);

