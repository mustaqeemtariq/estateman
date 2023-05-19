import axios from 'axios'
import { apiHost } from 'src/utils/host'

const getPropertyImages = (id: string) => {
	return axios
		.get(`${apiHost}/getimageurl?id=${id}`)
		.then(response => response.data.data)
		.catch(error => error.response.data)
}

const getAuctionImages = (id: string) => {
	return axios.get(`${apiHost}/getauctionimageurl?id=${id}`).then(response => response.data.data)
}

const uploadAuctionImages = (data: FormData) => {
	return axios
		.post(`${apiHost}/UploadImages`, data)
		.then(response => response.data)
		.catch(error => error.response.data)
}

const uploadPropertyImages = (data: { propertyDetails: FormData; addHistory: FormData }) => {
	return axios
		.post(`${apiHost}/UploadPropertyImages`, data)
		.then(response => response.data)
		.catch(error => error.response.data)
}

const imageService = {
	getPropertyImages,
	getAuctionImages,
	uploadPropertyImages,
	uploadAuctionImages
}

export default imageService
