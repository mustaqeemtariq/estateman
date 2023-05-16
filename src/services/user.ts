import axios from 'axios'
import { User } from 'src/types/typings'
import { apiHost } from 'src/utils/host'

const getUserById = (id: string) => {
	return axios.get(`${apiHost}/USER?id=${id}`).then(response => response.data.data)
}

const getAllUsers = () => {
	return axios.get(`${apiHost}/ALLUSER`).then(response => response.data.data)
}

const addUser = (data: User) => {
	return axios
		.post(`${apiHost}/ADDUSER`, {
			...data
		})
		.then(response => response.data)
		.catch(err => {
			return err.response.data
		})
}

const editUser = (id: string, data: User) => {
	return axios
		.put(`${apiHost}/EditUSER?id=${id}`, {
			...data
		})
		.then(response => response.data)
		.catch(err => {
			return err.response.data
		})
}

const deleteUser = (id: string) => {
	return axios
		.delete(`${apiHost}/USER/?id=${id}`)
		.then(response => response.data)
		.catch(err => {
			return err.response.data
		})
}

const searchUser = (value: string) => {
	return axios.get(`${apiHost}/SearchUser?Username=${value}`).then(response => response.data)
}

const userService = {
	getUserById,
	getAllUsers,
	addUser,
	editUser,
	deleteUser,
	searchUser
}

export default userService
