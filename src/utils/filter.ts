import { Auction, FilterParameter, Property } from 'src/types/typings'

export const ApplyPropertyFilter = (filterData: FilterParameter, originalData: Property[]) => {
	let filteredData = originalData.slice()

	if (filterData.period === 'newest') {
		filteredData = filteredData.sort((a, b) => {
			return new Date(b.YearBuilt).getTime() - new Date(a.YearBuilt).getTime()
		})
	} else if (filterData.period === 'oldest') {
		filteredData = filteredData.sort((a, b) => {
			return new Date(a.YearBuilt).getTime() - new Date(b.YearBuilt).getTime()
		})
	}

	if (filterData.city !== '') {
		filteredData = filteredData.filter(item => {
			return item.PropertyDetails.City === filterData.city
		})
	}

	if (filterData.type !== '') {
		filteredData = filteredData.filter(item => {
			return item.PropertyType === filterData.type
		})
	}

	if (filterData.category !== '') {
		filteredData = filteredData.filter(item => {
			return item.PropertyCategory === filterData.category
		})
	}

	if (filterData.contract !== '') {
		filteredData = filteredData.filter(item => {
			return item.ContractType === filterData.contract
		})
	}

	if (filterData.status !== '') {
		filteredData = filteredData.filter(item => {
			return item.OccupancyStatus === filterData.status
		})
	}

	return filteredData
}

export const ApplyAuctionFilter = (filterData: FilterParameter, originalData: Auction[]) => {
	let filteredData = originalData.slice()

	if (filterData.city !== '') {
		filteredData = filteredData.filter(item => {
			return item.City === filterData.city
		})
	}

	if (filterData.society !== '') {
		filteredData = filteredData.filter(item => {
			return item.Society === filterData.society
		})
	}

	if (filterData.auctioneer !== '') {
		filteredData = filteredData.filter(item => {
			return item.Auctioneer === filterData.auctioneer
		})
	}

	return filteredData
}
