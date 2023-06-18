import axios from 'axios'
import { apiHost } from 'src/utils/host'

const getPropertyImages = (id: string) => {
	return axios
		.get(`${apiHost}/getimageurl?id=${id}`)
		.then(response => response.data.data)
		.catch(error => error.response.data)
}

const getAuctionImages = (id: string) => {
	return axios.get(`${apiHost}/getauctionimageurl?id=${id}`).then(response => response.data.data).catch(error => error.response.data)
}

const uploadAuctionImages = (data: FormData, id:string) => {
	return axios
		.post(`${apiHost}/UploadImages?id=${id}`, data)
		.then(response => response.data)
		.catch(error => error.response.data)
}

const imageService = {
	getPropertyImages,
	getAuctionImages,
	uploadAuctionImages
}

export default imageService
