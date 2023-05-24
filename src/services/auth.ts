import axios from 'axios'
import { apiHost } from 'src/utils/host'
import { indexedStorageDB } from 'src/utils/local-forage'

const login = (Username: string, Password: string) => {
	return axios
		.post(`${apiHost}/users/login`, {
			Username,
			Password
		})
		.then(response => {
			return response.data
		})
		.catch(err => {
			return err.response.data
		})
}

const loginSurveyor = (Username: string, Password: string) => {
	return axios.post(`${apiHost}/loginSurveyor`, {
		Username,
		Password
	})
	.then(response => {
		return response.data
	})
	.catch(err => {
		return err.response.data
	})
}

const logout = () => {
	indexedStorageDB.clear(() => console.log('store clear'))
}

const forgotPassword = (Username: string) => {
	return axios.post(`${apiHost}/users/forgot-password`, {
		Username
	}).then(response => response.data)
	.catch(err => err.response.data)
}

const authService = { login, loginSurveyor, logout, forgotPassword }

export default authService
