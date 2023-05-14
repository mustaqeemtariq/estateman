import axios from 'axios'
import { toast } from 'react-hot-toast'
import { apiHost } from 'src/utils/host'

axios.defaults.baseURL = apiHost

const axiosInstance = axios.create({
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=UTF-8'
	}
})

axiosInstance.interceptors.request.use(config => {
	config.headers.Authorization = '' // TODO: Get token from indexedDb or localStorage
	return config
})

axiosInstance.interceptors.response.use(
	response => response,
	error => {
		if (!error.response) {
			toast.error('Service not available!')
		} else if (error.response.status === 401) {
			toast.error('Session has been expired, login again!')
		}
		return error
	}
)

export default axiosInstance
