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

const logout = () => {
	indexedStorageDB.clear(() => console.log('store clear'))
}

const authService = { login, logout }

export default authService
