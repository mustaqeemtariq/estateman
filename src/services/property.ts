import axios from 'axios'
import { Property } from 'src/types/typings'
import { apiHost } from 'src/utils/host'

const getAllProperties = () => {
	return axios.get(`${apiHost}/ALLProperties`).then(response => response.data.data)
}

const getLeaseProperties = () => {
	return axios.get(`${apiHost}/AllLease`).then(response => response.data)
}

const addProperty = (data: Property) => {
	return axios
		.post(`${apiHost}/ADDProperty`, {
			data
		})
		.then(response => response.data)
}

const updateProperty = (id: string, data: Property) => {
	return axios.put(`${apiHost}/UpdateProperty?id=${id}`, {
		data
	})
}

const getHistory = () => {
	return axios.get(`${apiHost}/ALLHistory`).then(response => response.data)
}

const searchProperty = (value: string) => {
	return axios.get(`${apiHost}/searchproperty`).then(response => response.data)
}

const propertyService = {
	getAllProperties,
	getLeaseProperties,
	addProperty,
	updateProperty,
	getHistory,
	searchProperty
}

export default propertyService
