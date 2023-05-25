import { Property } from 'src/types/typings'

export const AddPropertyFormValues = (data: Property | undefined) => ({
	Title: data?.Title,
	ContractType: data?.ContractType,
	PropertyType: data?.PropertyType,
	Location: data?.Location,
	LandArea: data?.LandArea,
	Units: data?.Units,
	Price: data?.Price,
	YearBuilt: data?.YearBuilt,
	PropertyCategory: data?.PropertyCategory
})

export const PropertyDetailsFormValues = (data: Property | undefined) => ({
	City: data?.PropertyDetails?.City,
	Society: data?.PropertyDetails?.Society,
	Housenumber: data?.PropertyDetails?.Housenumber,
	Bed: data?.PropertyDetails?.Bed,
	Bath: data?.PropertyDetails?.Bath,
	Kitchen: data?.PropertyDetails?.Kitchen,
	Gas: data?.PropertyDetails?.Gas,
	Electricity: data?.PropertyDetails?.Electricity,
	Sector: data?.PropertyDetails?.Sector,
	Streetno: data?.PropertyDetails?.Streetno,
	images: data?.PropertyDetails?.imagePath,
	Name: data?.OwnerDetails?.Name,
	Address: data?.OwnerDetails?.Address,
	ContactNumber: data?.OwnerDetails?.ContactNumber,
	AlternateNumber: data?.OwnerDetails?.AlternateNumber,
	CNIC: data?.OwnerDetails?.CNIC,
	Ligitation: data?.OwnerDetails?.Ligitation,
	OwnerDescription: data?.OwnerDetails?.OwnerDescription
})

export const AddHistoryFormValues = (data: Property | undefined) => ({
	Date: data?.AddHistory?.Date,
	AddDetails: data?.AddHistory?.AddDetails,
	images: data?.AddHistory?.imagePath,
	AddPricingHistory: data?.AddHistory?.AddPricingHistory,
	LeaseExpiringOn: data?.AddHistory?.LeaseExpiringOn,
	Calltype: data?.AddHistory?.Calltype,
	CallDetails: data?.AddHistory?.CallDetails,
	OccupancyStatus: data?.AddHistory?.OccupancyStatus
})

export const CommissionFormValues = (data: Property | undefined) => ({
	Amount: data?.AddCommission?.Amount,
	Cheque: data?.AddCommission?.Cheque,
	AccountNumber: data?.AddCommission?.AccountNumber,
	Branch: data?.AddCommission?.Branch,
	BankDetails: data?.AddCommission?.BankDetails
})
