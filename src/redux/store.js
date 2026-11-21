// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import authSlice from './authSlice'
// import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage
// }
// const rootReducer = combineReducers({
//     auth:authSlice
// })
// const persistedReducer = persistReducer(persistConfig, rootReducer)
// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             seriallizableCheck:false
//                 // { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] }
//         })
// })
// export default store




import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'
import postSlice from './postSlice'
import socketSlice from './socketSlice'
import chatSlice from './chatSlice'
import realTimeNotificationSlice from './realTimeNotificationsSlice'
import { persistReducer, persistStore,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageModule from 'redux-persist/lib/storage';
const storage = storageModule.default;

const rootReducer = combineReducers({
    auth: authSlice,
    post: postSlice,
    socketio: socketSlice,
    chat: chatSlice,
    realTimeNotification:realTimeNotificationSlice
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:   { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] }
        }),
});

export const persistor = persistStore(store);


