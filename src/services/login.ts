import axios from 'axios'
import { apiHost } from 'src/utils/host'

const login = (Username: string, Password: string) => {
	return axios
		.post(`${apiHost}/users/login`, {
			Username,
			Password
		})
		.then(response => {
			return response.data
		})
}

const authService = { login }

export default authService
