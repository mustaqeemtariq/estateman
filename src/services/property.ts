import axios from 'axios'
import moment from 'moment'
import { Property } from 'src/types/typings'
import { apiHost } from 'src/utils/host'

const getAllProperties = () => {
	return axios.get(`${apiHost}/ALLProperties`).then(response => response.data.data.filter(({Title}) => Title))
}

const getLeaseProperties = () => {
	return axios.get(`${apiHost}/AllLease`).then(response => response.data.data)
}

const addProperty = (data: Property) => {
	return axios
		.post(`${apiHost}/ADDProperty`, {
			...data
		})
		.then(response => response.data)
		.catch(err => err.response.data)
}

const updateProperty = (
	id: string,
	PropertyDetails: Property,
	OwnerDetails: Property,
	AddHistory: Property,
	AddCommission: Property
) => {
	return axios
		.put(`${apiHost}/UpdateProperty?id=${id}`, {
			PropertyDetails,
			OwnerDetails,
			AddHistory,
			AddCommission
		})
		.then(response => response.data)
		.catch(err => err.response.data)
}

const getHistory = () => {
	return axios
		.get(`${apiHost}/ALLHistory`)
		.then(response => response.data.data)
		.catch(err => err.response.data)
}

const searchProperty = (value: string) => {
	return axios
		.get(`${apiHost}/searchproperty?Title=${value}`)
		.then(response => response.data.data)
		.catch(err => err.response.data)
}

const leaseDue = () => {
	const currentDate = moment(new Date()).format('YYYY-MM-DD')
	return axios
		.get(`${apiHost}/LeaseDue?currentDate=${currentDate}`)
		.then(response => response.data.data)
}

const getPropertyByContract = (type: string) => {
	return axios.get(`${apiHost}/UnitsSold?ContractType=${type}`).then(response => response.data.data)
}

const propertyService = {
	getAllProperties,
	getLeaseProperties,
	addProperty,
	updateProperty,
	getHistory,
	searchProperty,
	leaseDue,
	getPropertyByContract
}

export default propertyService
