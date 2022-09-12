import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userRedux"

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined
        storage.removeItem('persist:root')
    }
    return persistedReducer(state, action)
}

export const store = configureStore ({
    reducer: {
        user: rootReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)