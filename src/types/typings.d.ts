import { ContractTypes, PropertyTypes, UnitTypes, UserRightTypes } from 'src/constants/constants'

interface User {
	id: string
	username: string
	email: string
	phone: string
}

interface Users {
	[id: string]: Mother
}

interface RootReducerState {
	db: RootDBState
	users: Users
}

interface RootDBState {
	client_id: string
	initialized: boolean
	queue: {}
}

type UserForm = User & {
	cnic: string
	address: string
	password: string
	confirmPassword: string
	address: string
	rights: UserRightTypes[]
}

type AddPropertyForm = {
	title: string
	contract: ContractTypes
	property: PropertyTypes
	category: string
	location: string
	area: number
	units: UnitTypes
	price: string
	year: string
}

type OwnerDetails = {
	name: string
	phone: string
	alternatephone: string
	address: string
	cnic: string
	ligitation: string
	description: string
}

type PropertyDetailsForm = OwnerDetails & {
	city: string
	house: string
	street?: number
	society?: string
	places?: string
	sector?: string
	bed?: number
	bath?: number
	kitchen?: number
	gas?: string
	electricity?: string
}

type AddHistoryForm = {
	historydate?: string
	occupancy?: string
	leaseexpiry?: string
	historydetails?: string
	historyimage?: File[]
	callrecord?: string
}

type PropertyFormType = AddPropertyForm & PropertyDetailsForm & AddHistoryForm

type CallRecordForm = {
	date?: string
	phone?: string
	callername?: string
}

type PricingHistoryForm = {
	price?: string
	date?: string
}

type CommissionForm = {
	commissionprice?: string
	accountnumber?: string
	chequenumber?: string
	branch?: string
	bankdetails?: string
}
