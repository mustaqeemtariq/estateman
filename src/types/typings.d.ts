import { ContractTypes, PropertyTypes, UnitTypes, UserRightTypes } from 'src/constants/constants'

interface User {
	id: string
	Username: string
	Email: string
	Password: string
	Contact: string
}

interface Auth {
	username: string
	accessToken: string
}

interface RootReducerState {
	user: { auth: Auth }
	db: RootDBState
	users: Users
}

interface RootDBState {
	client_id: string
	initialized: boolean
	queue: {}
}

type RootReducerState = {
	auth: User
	db: DbState
}

type Users = {
	[id: number]: User
}

type Properties = {
	[_id: number]: Property
}

type DbState = {
	users: Users
	properties: Properties
	connected: boolean
	lastSyncedOn: number
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
	_id: string
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
	Bed?: string
	Bath?: string
	Kitchen?: string
	Gas?: string
	Electricity?: string
	images?: string[]
}

type AddHistoryForm = {
	Date?: string
	OccupancyStatus?: string
	LeaseExpiringOn?: string
	AddDetails?: string
	images?: string[]
	CallType?: string
	SentCallDetails?: CallRecordForm
	CallDetails?: {
		name: string
		from: string
		to: string
		date: string
	}[]
	SentPricingHistory?: PricingHistoryForm
	AddPricingHistroy?: {
		year: string
		price: string
	}[]
}

type CallRecordForm = {
	[index: string]: {
		CallerFrom?: string
		CallerTo?: string
		CallerDate?: string
		CallerName?: string
		type?: string
	}
}

type PricingHistoryForm = {
	[index: string]: {
		HistoryPrice?: string
		HistoryYear?: string
	}
}

type CommissionForm = {
	Amount?: string
	AccountNumber?: string
	Cheque?: string
	Branch?: string
	BankDetails?: string
}

type Property = AddPropertyForm &
	OwnerDetails &
	PropertyDetailsForm &
	AddHistoryForm &
	CommissionForm & {
		PropertyDetails: PropertyDetailsForm
		AddHistory: AddHistoryForm
		AddCommision: CommissionForm
	}

type Auction = {
	Title: string
	Auctioneer: string
	City: CityNames
	Society?: string
	AuctionDateandTime?: string
	Location?: string
	LandArea: string
	Balance?: string
	Units: UnitTypes
	ReservePrice: string
	PlaceofAuction: string
	ContactPerson?: string
	ContactNumber?: string
	images?: string[]
}

type FilterParameter = {
	period?: string
	city: string
	type?: string
	category?: string
	contract?: string
	status?: string
	society?: string
	auctioneer?: string
}
