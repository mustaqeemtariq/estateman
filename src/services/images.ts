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

const uploadAuctionImages = (data: FormData, id:string) => {
	return axios
		.post(`${apiHost}/UploadImages?id=${id}`, data)
		.then(response => response.data)
		.catch(error => error.response.data)
}

const uploadPropertyImages = (data: FormData, id: string ) => {
	return axios
		.put(`${apiHost}/UploadPropertyImages?id=${id}`, data)
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
