import axios from 'axios'
import { Auction } from 'src/types/typings'
import { apiHost } from 'src/utils/host'

const getAllAuctions = () => {
	return axios
		.get(`${apiHost}/viewAllAuction`)
		.then(response => response.data.data)
}

const addAuction = (data: Auction) => {
	return axios
		.post(`${apiHost}/ADDAuction`, {
			...data
		})
		.then(response => response.data)
		.catch(error => error.response.data)
}

const auctionService = {
	getAllAuctions,
	addAuction
}

export default auctionService
