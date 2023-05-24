import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import authService from 'src/services/auth'
import { Auth } from 'src/types/typings'

export const login = createAsyncThunk(
	'auth/login',
	async (user: { Username: string; Password: string; Roles: string }, thunkAPI) => {
		console.log(user.Roles);
		
		try {
			let response
			if (user.Roles === 'admin') {
				response = await authService.login(user.Username, user.Password)
				console.log(response)
			}
			else {
				response = await authService.loginSurveyor(user.Username, user.Password)
				console.log(response)
			}
			
			if (response.success) {	
				return thunkAPI.fulfillWithValue({ ...response.data, ...user })
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
			const { username, accessToken, Roles } = action.payload
			return {
				username,
				accessToken,
				Roles
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
