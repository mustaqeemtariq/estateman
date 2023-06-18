import axios from 'axios'
import moment from 'moment'
import { AddHistoryForm, AddPropertyForm, Property, PropertyDetailsForm } from 'src/types/typings'
import { apiHost } from 'src/utils/host'

const getAllProperties = () => {
	return axios.get(`${apiHost}/ALLProperties`).then(response => response.data.data)
}

const getLeaseProperties = () => {
	return axios.get(`${apiHost}/AllLease`).then(response => response.data.data)
}

const addProperty = (data: AddPropertyForm) => {
	return axios
		.post(`${apiHost}/ADDProperty`, data)
		.then(response => response.data)
		.catch(err => err.response.data)
}

const addPropertyDetails = (data: PropertyDetailsForm, id: string) => {
	return axios.post(`${apiHost}/AddPropertyDetails?id=${id}`, {PropertyDetails: data}).then(response => response.data)
	.catch(err => err.response.data)
}

const addPropertyDetailsImages = (data: FormData, id: string) => {
	return axios.post(`${apiHost}/PropertyDetailsImages?id=${id}`, data).then(response => response.data)
	.catch(err => err.response.data)
}

const addPropertyHistory = (data: AddHistoryForm, id: string) => {
	return axios.post(`${apiHost}/AddHistory?id=${id}`, {AddHistory: [data], AddCommission: data.AddCommission}).then(response => response.data)
	.catch(err => err.response.data)
}

const addPropertyHistoryImages = (data: FormData, id: string) => {
	return axios.post(`${apiHost}/AddHistoryImages?id=${id}`, data).then(response => response.data)
	.catch(err => err.response.data)
}

const editProperty = (data: AddPropertyForm, id: string) => {
	return axios.post(`${apiHost}/EditProperty?id=${id}`, data)
	.then(response => response.data).catch(err => err.response.data)
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

const uploadFile = (data: FormData) => {
	return axios.post(`${apiHost}/UploadExcelData`, data).then(response => response.data)
	.catch(err => err.response.data)
}

const uploadHistoryFile = (data: FormData, id: string) => {
	return axios.post(`${apiHost}/AddExcelHistory?id=${id}`, data).then(response => response.data)
	.catch(err => err.response.data)
} 

const leaseDue = () => {
	const currentDate = moment(new Date()).format('YYYY-MM-DD')
	return axios
		.get(`${apiHost}/LeaseDue?currentDate=${currentDate}`)
		.then(response => response.data.data)
}

const getPropertyByContract = (type: string) => {
	return axios.get(`${apiHost}/UnitsSold?ContractType=${type}`).then(response => response.data.data).catch(err => err.data)
}

const propertyService = {
	getAllProperties,
	getLeaseProperties,
	addProperty,
	addPropertyDetails,
	addPropertyDetailsImages,
	addPropertyHistory,
	addPropertyHistoryImages,
	editProperty,
	updateProperty,
	getHistory,
	searchProperty,
	leaseDue,
	uploadFile,
	uploadHistoryFile,
	getPropertyByContract
}

export default propertyService
