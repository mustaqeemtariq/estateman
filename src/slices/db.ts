import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Auction, Auctions, DbState, Properties, Property, User, Users } from 'src/types/typings'

const initialState: DbState = {
	users: {},
	properties: {},
	auctions: {},
	connected: false,
	lastSyncedOn: new Date().getTime()
}

const queueSlice = createSlice({
	name: 'db',
	initialState: initialState,
	reducers: {
		toggleNetworkConnectivity(state, action: PayloadAction<{ state: boolean }>) {
			return {
				...state,
				connected: action.payload.state
			}
		},
		updateLastSyncOn(state, action: PayloadAction<{ time: number }>) {
			return {
				...state,
				lastSyncedOn: action.payload.time
			}
		},
		saveUsers(state: DbState, action: PayloadAction<User[]>) {
			const users = action.payload.reduce<Users>((agg, curr) => {
				return { ...agg, [curr.id ?? 0]: curr }
			}, {})

			return {
				...state,
				users: {
					...state.users,
					...users
				}
			}
		},
		saveProperties(state: DbState, action: PayloadAction<Property[]>) {
			const properties = action.payload.reduce<Properties>((agg, curr) => {
				return { ...agg, [curr._id ?? 0]: curr }
			}, {})

			return {
				...state,
				properties: {
					...state.properties,
					...properties
				}
			}
		},
		saveAuctions(state: DbState, action: PayloadAction<Auction[]>) {
			const auctions = action.payload.reduce<Auctions>((agg, curr) => {
				return { ...agg, [curr._id ?? 0]: curr}
			}, {})

			return {
				...state,
				auctions: {
					...state.auctions,
					...auctions
				}
			}
		}
	},
	extraReducers: {}
})

const { reducer } = queueSlice

export const { saveUsers, saveAuctions, updateLastSyncOn, saveProperties, toggleNetworkConnectivity } =
	queueSlice.actions

export default reducer
