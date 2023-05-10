import { FilterParameter, Property } from 'src/types/typings'

export const ApplyFilter = (filterData: FilterParameter, originalData: Property[]) => {
	// filter by period
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

	// filter by city
	if (filterData.city !== '') {
		filteredData = filteredData.filter(item => {
			return item.Location === filterData.city
		})
	}

	// filter by type
	if (filterData.type !== '') {
		filteredData = filteredData.filter(item => {
			return item.PropertyCategory === filterData.type
		})
	}

	// filter by category
	if (filterData.category !== '') {
		filteredData = filteredData.filter(item => {
			return item.PropertyCategory === filterData.category
		})
	}

	// filter by contract
	if (filterData.contract !== '') {
		filteredData = filteredData.filter(item => {
			return item.ContractType === filterData.contract
		})
	}

	// filter by status
	if (filterData.status !== '') {
		filteredData = filteredData.filter(item => {
			return item.OccupancyStatus === filterData.status
		})
	}

	return filteredData
}
