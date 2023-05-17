import axios from 'axios'
import { apiHost } from 'src/utils/host'

const getAllImages = (id: string) => {
	return axios
		.get(`${apiHost}/getimageurl?id=${id}`)
		.then(response => response.data.data)
		.catch(error => error.response.data)
}

const imageService = {
	getAllImages
}

export default imageService
