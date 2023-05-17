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

type ImagePath = {
	propertyDetails: string[]
	addHistory: string[]
}

type Users = {
	[id: number]: User
}

type Properties = {
	[_id: number]: Property
}

type Auctions = {
	[_id: number]: Auction
}

type DbState = {
	users: Users
	properties: Properties
	auctions: Auctions
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
	imagePath?: string[]
	sentPropertyImages?: File[]
}

type AddHistoryForm = {
	Date?: string
	OccupancyStatus?: string
	LeaseExpiringOn?: string
	AddDetails?: string
	sentHistoryImages?: File[]
	CallType?: string
	SentCallDetails?: CallRecordForm
	CallDetails?: {
		To: string
		Name: string
		Date?: string
		From?: string
	}[]
	SentPricingHistory?: PricingHistoryForm
	AddPricingHistory?: {
		year?: string
		price?: string
	}[]
	imagePath?: string[]
}

type CallRecordForm = {
	[index: string]: {
		To: string
		Name: string
		Date?: string
		From?: string
	}
}

type PricingHistoryForm = {
	[index: string]: {
		price?: string
		year?: string
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
		OwnerDetails: OwnerDetails
		AddCommission: CommissionForm
	}

type Auction = {
	_id: string
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
	imagePath?: string[]
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

type ImageType = {
	path: string
	contentType: string
	_id: string
}
