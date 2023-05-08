import axios from 'axios'
import { apiHost } from 'src/utils/host'

axios.defaults.baseURL = apiHost

const axiosInstance = axios.create({
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=UTF-8'
	}
})

export default axiosInstance
