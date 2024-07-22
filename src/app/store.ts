import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { AvailableVehicleApi, LoginApi, PaymentApi, RegisterApi, UserApi,VehicleApi, VehicleSpecificationApi } from '../features/users/UsersAPI';
import authReducer from '../components/authProtected/auth';

// CREATE PERSIST CONFIG
const persistConfig = {
    key: 'root',
    storage,
};

// Combine all reducers
const rootReducer = combineReducers({
    auth: authReducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [VehicleApi.reducerPath]: VehicleApi.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [PaymentApi.reducerPath]: PaymentApi.reducer,
    [RegisterApi.reducerPath]: RegisterApi.reducer,
    [AvailableVehicleApi.reducerPath]: AvailableVehicleApi.reducer,
    [VehicleSpecificationApi.reducerPath]: VehicleSpecificationApi.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
            .concat(UserApi.middleware)
            .concat(VehicleApi.middleware)
            .concat(LoginApi.middleware)
            .concat(PaymentApi.middleware)
            .concat(RegisterApi.middleware)
            .concat(AvailableVehicleApi.middleware)
            .concat(VehicleSpecificationApi.middleware)
});

// Create a persistent store
export const persistentStore = persistStore(store);

// Export types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
