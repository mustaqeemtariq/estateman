import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { indexedStorageDB } from 'src/utils/local-forage'

import authReducer from 'src/slices/auth'
import dbReducer from 'src/slices/db'

const rootRersistConfig = {
	key: 'root',
	version: 1,
	storage: indexedStorageDB
}

const rootReducer = combineReducers({
	auth: authReducer,
	db: dbReducer
})

const persistedReducer = persistReducer(rootRersistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	devTools: true
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

export default store
