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

type PropertyDetailsForm = {
	City: string
	Housenumber: string
	Streetno?: string
	Society?: string
	places?: string
	Sector?: string
	Bed?: number
	Bath?: number
	Kitchen?: number
	Gas?: string
	Electricity?: string
	PropertyImages?: string[]
}

type AddHistoryForm = {
	HistoryDate?: string
	OccupancyStatus?: string
	LeaseExpiringOn?: string
	HistoryDetails?: string
	HistoryImages?: string[]
	CallType?: string
	CallDetails?: CallRecordForm[]
	AddPricingHistory?: PricingHistoryForm[]
}

type CallRecordForm = {
	CallerFrom?: string
	CallerTo?: string
	CallerDate?: string
	CallerName?: string
}

type PricingHistoryForm = {
	HistoryPrice?: string
	HistoryYear?: string
}

type CommissionForm = {
	CommissionAmount?: string
	AccountNumber?: string
	Cheque?: string
	Branch?: string
	BankDetails?: string
}

type Property = AddPropertyForm &
	OwnerDetails &
	PropertyDetailsForm &
	AddHistoryForm &
	CommissionForm &
	PricingHistoryForm &
	CallRecordForm

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
