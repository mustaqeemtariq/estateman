import { ContractTypes, PropertyTypes, UnitTypes, UserRightTypes } from 'src/constants/constants'

interface User {
	username: string
	email: string
	phone: string
}

type UserForm = User & {
	cnic: string
	address: string
	password: string
	confirmPassword: string
	address: string
	rights: UserRightTypes
}

type PropertyForm = {
	title: string
	contract: ContractTypes
	property: PropertyTypes
	category: string
	location: string
	area: number
	units: UnitTypes
	price: string
	year: number
}
