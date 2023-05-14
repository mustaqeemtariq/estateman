import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import authService from 'src/services/auth'
import { Auth } from 'src/types/typings'

export const login = createAsyncThunk(
	'auth/login',
	async (user: { Username: string; Password: string }, thunkAPI) => {
		try {
			const response = await authService.login(user.Username, user.Password)
			if (response.success) {
				return thunkAPI.fulfillWithValue({ ...response.data })
			}
		} catch (error: any) {
			return thunkAPI.rejectWithValue(false)
		}
	}
)

const initialState = {} as Auth

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		logOut(state) {
			return initialState
		}
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state: Auth, action: PayloadAction<any>) => {
			const { username, accessToken } = action.payload
			return {
				username,
				accessToken
			}
		}),
			builder.addCase(login.rejected, (state: Auth, action: PayloadAction<any>) => {
				return initialState
			})
	}
})

const { reducer } = authSlice

export const { logOut } = authSlice.actions

export default reducer
