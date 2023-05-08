import { ContractTypes, PropertyTypes, UnitTypes, UserRightTypes } from 'src/constants/constants'

interface User {
	id: string
	Username: string
	Email: string
	Contact: string
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
	CNIC: string
	Address: string
	Password: string
	ConfirmPassword: string
	Address: string
	rights: UserRightTypes[]
}

type AddPropertyForm = {
	Title: string
	ContractType: ContractTypes
	PropertyType: PropertyTypes
	PropertyCategory: string
	Location: string
	LandArea: number
	Units: UnitTypes
	Price: string
	YearBuilt: string
}

type OwnerDetails = {
	Name: string
	ContactNumber: string
	AlternateNumber: string
	Address: string
	CNIC: string
	Ligitation: string
	OwnerDescription: string
}

type PropertyDetailsForm = OwnerDetails & {
	City: string
	Housenumber: string
	Streetno?: number
	Society?: string
	places?: string
	Sector?: string
	Bed?: number
	Bath?: number
	Kitchen?: number
	Gas?: string
	Electricity?: string
	images?: string[]
}

type AddHistoryForm = {
	Date?: string
	OccupancyStatus?: string
	LeaseExpiringOn?: string
	historydetails?: string
	images?: string[]
	CallDetails?: CallRecordForm[]
	AddPricingHistory?: PricingHistoryForm[]
}

type CallRecordForm = {
	from?: string
	to?: string
	type: string
	phone?: string
	description?: string
}

type PricingHistoryForm = {
	price?: string
	year?: string
}

type CommissionForm = {
	Amount?: string
	AccountNumber?: string
	Cheque?: string
	Branch?: string
	BankDetails?: string
}

type Property = AddPropertyForm &
	OwnerDetails & {
		PropertyDetails: PropertyDetailsForm
		AddHistory: AddHistoryForm
		AddCommission?: CommissionForm
	}

type Auction = {
	title: string
	auctioneer: string
	city: CityNames
	society?: string
	date?: string
	location?: string
	area: string
	balance?: string
	units: UnitTypes
	reservedPrice: string
	auctionplace: string
	contactname?: string
	contactphone?: string
	auctionimage?: string[]
}
