import axios from 'axios'
import { Auction, Property } from 'src/types/typings'

const getAllAuctions = () => {
	return axios
		.get('/viewAllAuction')
		.then(response => response.data)
}

const addAuction = (data: Auction) => {
    return axios.post('/ADDAuction', {
        data
    })
}

const auctionService = {
	getAllAuctions,
    addAuction
}

export default auctionService
