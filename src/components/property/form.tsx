import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
	Control,
	Controller,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
	useForm
} from 'react-hook-form'

import * as yup from 'yup'

import { PlusIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { BiCurrentLocation } from 'react-icons/bi'
import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { Input, InputNumber } from 'src/components/app/input'
import { CityNames, ContractTypes, PropertyTypes, UnitTypes } from 'src/constants/constants'
import {
	AddHistoryFormValues,
	AddPropertyFormValues,
	CommissionFormValues,
	PropertyDetailsFormValues
} from 'src/constants/form-defaults'
import { useAppSelector } from 'src/hooks/rtk'
import imageService from 'src/services/images'
import propertyService from 'src/services/property'
import { Property } from 'src/types/typings'
import { Checkbox } from '../app/checkbox'
import { DateInput } from '../app/date'
import FileUpload from '../app/file-upload'
import { MapComponent } from '../app/map'
import { Radio } from '../app/radio'
import { Select } from '../app/select'
import CallRecord from './call-record'
import Commission from './commission'
import PricingHistory from './pricing-history'

interface PropertyFormProps {
	currentTab: string
	setActive: Dispatch<
		SetStateAction<{
			propertyDetails: boolean
			addHistory: boolean
			allHistory: boolean
		}>
	>
	setCurrentTab: Dispatch<SetStateAction<string>>
	editData?: Property
	isNew?: boolean
}

export interface HistoryDate {
	[index: string]: {
		date: string
	}
}

enum FormSteps {
	ADDPROPERTY = 1,
	PROPERTYDETAILS = 2,
	ADDHISTORY = 3,
	ALLHISTORY = 4
}

type StateType = {
	step: FormSteps
}

const PropertyForm = ({
	currentTab,
	setActive,
	setCurrentTab,
	editData,
	isNew
}: PropertyFormProps) => {
	const [state, setState] = useState<StateType>({
		step: FormSteps.ADDPROPERTY
	})

	const schema = yup.object<Property>().shape({
		Title: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Title is required')
		}),
		ContractType: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Contract Type is required')
		}),
		PropertyType: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Property Type is required')
		}),
		Location: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Location is required')
		}),
		LandArea: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Area is required')
		}),
		Units: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Select a unit')
		}),
		Price: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Price is required')
		}),
		YearBuilt: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema =>
				schema.test('yearType', 'Year is required', function (value) {
					if (value) return true
					return false
				})
		}),
		LeaseExpiringOn: yup.string().when('$step', {
			is: FormSteps.ADDHISTORY,
			then: schema =>
				schema.test('leaseType', 'Date is required', function (value) {
					if (this.parent.occupancy === 'occupied') {
						if (value == '') {
							return false
						}
						if (value) {
							const present = new Date()
							const selected = new Date(value)
							if (selected < present) {
								throw this.createError({
									message: 'Date cannot be in the past',
									path: 'LeaseExpiringon'
								})
							}
							return true
						}
					} else {
						return true
					}
				})
		}),
		PropertyCategory: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Category is required')
		}),
		City: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema => schema.required('City is required')
		}),
		Housenumber: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema =>
				schema.test('houseType', 'Invalid house type', function (value) {
					const name = this.parent.PropertyCategory
					if (!value) {
						throw this.createError({
							message: `${name.charAt(0).toUpperCase().concat(name.slice(1))} number is required`,
							path: 'Housenumber'
						})
					}
					return true
				})
		}),
		Gas: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema =>
				schema.test('gasType', 'Invalid gas type', function (value) {
					if (!value) return true
					if (value.toLowerCase() === 'yes' || value.toLocaleLowerCase() === 'no') return true

					throw this.createError({
						message: 'Gas must be either "yes" or "no" or empty',
						path: 'Gas'
					})
				})
		}),
		Electricity: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema =>
				schema.test('electricityType', 'Invalid electricity type', function (value) {
					if (!value) return true
					if (value.toLowerCase() === 'yes' || value.toLocaleLowerCase() === 'no') return true

					throw this.createError({
						message: 'Electricity must be either "yes" or "no" or empty',
						path: 'Electricity'
					})
				})
		}),
		Name: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema => schema.required('Name is required')
		}),
		Address: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema => schema.required('Address is required')
		}),
		ContactNumber: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema =>
				schema
					.required('Contact number is a required field')
					.min(11, 'Phone number should be 11 digits')
					.max(11, 'Phone number should be 11 digits')
		}),
		CNIC: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema =>
				schema
					.required('CNIC is a required field')
					.min(13, 'CNIC should be 13 digits')
					.max(13, 'CNIC should be 13 digits')
		})
	})

	const {
		register,
		control,
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors }
	} = useForm<Property>({
		resolver: yupResolver(schema as any),
		context: { step: state.step },
		defaultValues: {
			...AddPropertyFormValues(editData),
			...PropertyDetailsFormValues(editData),
			...AddHistoryFormValues(editData),
			...CommissionFormValues(editData)
		},
		mode: 'all'
	})

	const [category, setCategory] = useState<string>()
	const [showCommission, setShowCommission] = useState(false)
	const [propertyImages, setPropertyImages] = useState<File[]>([])
	const [historyImages, setHistoryImages] = useState<File[]>([])
	const [priceCount, setPriceCount] = useState(1)
	const [recordCount, setRecordCount] = useState(1)
	const [propertyDate, setPropertyDate] = useState<string>('')
	const [historyDate, setHistoryDate] = useState<string>('')
	const [leaseDate, setLeaseDate] = useState<string>('')
	const [callDate, setCallDate] = useState<HistoryDate>({ 0: { date: '' } })
	const [priceDate, setPriceDate] = useState<HistoryDate>({ 0: { date: '' } })

	let component

	switch (state.step) {
		case FormSteps.ADDPROPERTY:
			component = (
				<AddPropertyForm
					{...{
						errors,
						register,
						control,
						watch,
						setCategory,
						setValue,
						editData,
						propertyDate,
						setPropertyDate
					}}
				/>
			)
			break
		case FormSteps.PROPERTYDETAILS:
			component = (
				<PropertyDetailsForm
					{...{
						errors,
						register,
						control,
						setValue,
						category,
						editData,
						propertyImages,
						setPropertyImages
					}}
				/>
			)
			break
		case FormSteps.ADDHISTORY:
			component = (
				<AddHistoryForm
					{...{
						errors,
						editData,
						register,
						control,
						watch,
						setValue,
						historyDate,
						setHistoryDate,
						leaseDate,
						setLeaseDate,
						callDate,
						setCallDate,
						priceDate,
						setPriceDate,
						historyImages,
						setHistoryImages,
						showCommission,
						setShowCommission,
						priceCount,
						setPriceCount,
						recordCount,
						setRecordCount
					}}
				/>
			)
			break
		default:
			component = null
	}

	const renderComponent = component

	const nextStep = handleSubmit(data => {
		{
			!showCommission &&
				setState(prevState => ({
					...prevState,
					step: prevState.step + 1
				}))
			handleStepChange()
		}
		setActive(prev => {
			return {
				allHistory: prev.addHistory ? true : false,
				addHistory: prev.propertyDetails ? true : false,
				propertyDetails: true
			}
		})
	})

	const handleStepChange = () => {
		if (currentTab === 'Add Property') {
			setCurrentTab('Property Details')
		} else if (currentTab === 'Property Details') {
			setCurrentTab('Add History')
		} else {
			router.push('/property/history')
		}
	}

	useEffect(() => {
		if (currentTab === 'Add Property') {
			setState(prevState => ({
				...prevState,
				step: FormSteps.ADDPROPERTY
			}))
		} else if (currentTab === 'Property Details') {
			setState(prevState => ({
				...prevState,
				step: FormSteps.PROPERTYDETAILS
			}))
		} else if (currentTab === 'All History') {
			router.push('/property/history')
		} else {
			setState(prevState => ({
				...prevState,
				step: FormSteps.ADDHISTORY
			}))
		}
	}, [currentTab])

	const [isUpdating, setUpdating] = useState(false)
	const router = useRouter()
	const formData = new FormData()

	const addProperty = async (
		data: any,
		PropertyDetails: any,
		OwnerDetails: any,
		AddHistory: any,
		AddCommission: any,
		formData: any
	) => {
		const response = await propertyService.addProperty(data)
		if (response.success) {

			await updateProperty(response.data._id, PropertyDetails, OwnerDetails, AddHistory, AddCommission)
			await addImage(formData, response.data._id)
		} else {
			toast.error('Property not saved')
			console.log(response.message)
			setUpdating(false)
		}
	}

	const updateProperty = async (
		id: string,
		PropertyDetails: any,
		OwnerDetails: any,
		AddHistory: any,
		AddCommission: any
	) => {
		const response = await propertyService.updateProperty(
			id,
			PropertyDetails,
			OwnerDetails,
			AddHistory,
			AddCommission
		)
		if (response.success) {
			toast.success('Property added successfully')
			setUpdating(false)
			router.push('/property/history')
		} else {
			toast.error('Property not added')
			console.log(response.message)
			setUpdating(false)
		}
	}

	const addImage = async (data: FormData, id: string ) => {
		const response = await imageService.uploadPropertyImages(data, id)

		if (response.success) {
			toast.success('Images added successfully')
		} else {
			toast.error('Images not added')
		}
	}

	const onSubmit = handleSubmit(data => {
		
		if (data.sentHistoryImages) {
			data.sentHistoryImages.forEach((image, index) => {
				formData.append(`imagePath`, image)
			})
		}


		if (data.sentPropertyImages) {
			data.sentPropertyImages.forEach((image, index) => {
				formData.append(`imagePath`, image)
			})
		}

		data.PropertyDetails = {
			City: data.City,
			Housenumber: data.Housenumber,
			Streetno: data?.Streetno,
			Society: data?.Society,
			places: data.places,
			Sector: data.Sector,
			Bed: data.Bed,
			Bath: data.Bath,
			Kitchen: data.Kitchen,
			Gas: data.Gas,
			Electricity: data.Electricity
		}

		data.OwnerDetails = {
			Name: data.Name,
			ContactNumber: data.ContactNumber,
			AlternateNumber: data.AlternateNumber,
			CNIC: data.CNIC,
			OwnerDescription: data.OwnerDescription,
			Address: data.Address,
			Ligitation: data.Ligitation
		}

		data.AddHistory = {
			Date: data.Date,
			OccupancyStatus: data.OccupancyStatus,
			LeaseExpiringOn: data.LeaseExpiringOn,
			AddDetails: data.AddDetails,
			Calltype: data.Calltype
		}

		data.AddCommission = {
			Amount: data.Amount,
			Branch: data.Branch,
			BankDetails: data.BankDetails,
			Cheque: data.Cheque,
			AccountNumber: data.AccountNumber
		}

		Object.values(data?.SentCallDetails || {}).map((item, index) => {
			if (data.AddHistory) {
				if (index == 0) {
					data.AddHistory.CallDetails = [
						{ Name: item.Name, To: item.To, From: item.From, Date: item.Date }
					]
				} else if (data.AddHistory.CallDetails) {
					data.AddHistory.CallDetails.push({
						Name: item.Name,
						To: item.To,
						From: item.From,
						Date: item.Date
					})
				}
			}
		})
		Object.values(data?.SentPricingHistory || {}).map((item, index) => {
			if (data.AddHistory) {
				if (index == 0) {
					data.AddHistory.AddPricingHistory = [{ year: item.year, price: item.price }]
				} else if (data.AddHistory.AddPricingHistory) {
					data.AddHistory.AddPricingHistory.push({ year: item.year, price: item.price })
				}
			}
		})

		const addPropertyData = {
			Units: data.Units,
			Location: data.Location,
			ContractType: data.ContractType,
			PropertyType: data.PropertyType,
			PropertyCategory: data.PropertyCategory,
			LandArea: data.LandArea,
			Price: data.Price,
			YearBuilt: data.YearBuilt,
			Title: data.Title
		}
		
		addProperty(
			addPropertyData,
			data.PropertyDetails,
			data.OwnerDetails,
			data.AddHistory,
			data.AddCommission, 
			formData,
		)
		setUpdating(true)
	})

	const handleCommissionReset = () => {
		setValue('Amount', '')
		setValue('Cheque', '')
		setValue('BankDetails', '')
		setValue('AccountNumber', '')
		setValue('Branch', '')
	}

	return (
		<div className="px-4 sm:px-4 lg:px-4">
			<form
				className="space-y-2 mb-3 sm:w-full w-full"
				onSubmit={event => {
					if (state.step === FormSteps.ADDHISTORY) {
						onSubmit(event)
					} else {
						nextStep(event)
					}
				}}>
				<div className="flex items-center justify-end text-base ">
					<div className="flex space-x-3">
						{showCommission && (
							<>
								<button
									type="button"
									onClick={() => {
										handleCommissionReset()
										setShowCommission(false)
									}}
									className="text-[#485276] px-8 border border-gray-300 rounded-md">
									<span className="uppercase">Close</span>
								</button>
								<button
									type="button"
									onClick={() => {
										setShowCommission(false)
									}}
									className="flex w-full justify-center border border-transparent py-3 text-white bg-black px-6 rounded-md">
									<span className="uppercase">Save & Add to History</span>
								</button>
							</>
						)}
						<Button
							type="submit"
							disabled={isUpdating}
							className={clsx('bg-black px-6', showCommission && 'hidden')}>
							{isUpdating ? (
								<>
									<Spinner className="w-5 h-5" />
									<span className="ml-2">Updating...</span>
								</>
							) : (
								<span className="uppercase whitespace-nowrap">
									{showCommission ? 'Save & Add to History' : 'Save'}
								</span>
							)}
						</Button>
					</div>
				</div>
				<>{renderComponent}</>
			</form>
		</div>
	)
}

interface FormProps {
	register?: UseFormRegister<Property>
	errors?: FieldErrors<Property>
	control?: Control<Property, any>
	setValue?: UseFormSetValue<Property>
	getValues?: UseFormGetValues<Property>
	watch?: UseFormWatch<Property>
	setCategory?: Dispatch<SetStateAction<string | undefined>>
	category?: string
	propertyDate?: string
	setPropertyDate?: Dispatch<SetStateAction<string>>
	historyDate?: string
	setHistoryDate?: Dispatch<SetStateAction<string>>
	LeaseDate?: string
	setLeaseDate?: Dispatch<SetStateAction<string>>
	callDate?: HistoryDate
	setCallDate?: Dispatch<SetStateAction<HistoryDate>>
	priceDate?: HistoryDate
	setPriceDate?: Dispatch<SetStateAction<HistoryDate>>
	propertyImages?: File[]
	setPropertyImages?: Dispatch<SetStateAction<File[]>>
	historyImages?: File[]
	setHistoryImages?: Dispatch<SetStateAction<File[]>>
	showCommission?: boolean
	setShowCommission?: Dispatch<SetStateAction<boolean>>
	editData?: Property
	priceCount?: number
	setPriceCount?: Dispatch<SetStateAction<number>>
	recordCount?: number
	setRecordCount?: Dispatch<SetStateAction<number>>
}

const AddPropertyForm = ({
	register,
	errors,
	control,
	watch,
	setCategory,
	propertyDate,
	setPropertyDate,
	editData,
	setValue
}: FormProps) => {
	const property = watch?.('PropertyType')
	const category = watch?.('PropertyCategory')

	const [showMap, setShowMap] = useState(false)

	useEffect(() => {
		setCategory?.(category)
	}, [category])

	const handleDate = (value: string) => {
		setValue?.('YearBuilt', value, { shouldValidate: true })
		setPropertyDate?.(value)
	}

	const handleMapData = (lat: number, lng: number) => {
		setValue?.('Location', `lat: ${lat.toFixed(2)}, lng: ${lng.toFixed(2)}`, {
			shouldValidate: true
		})
	}

	return (
		<div className="space-y-4">
			<div className="sm:space-y-8">
				<div className="flex space-x-8 items-center">
					<label htmlFor="title" className="flex items-center text-[#0D0C18]">
						Title
						<span className="text-[#FF0000]">*</span>
					</label>
					<Input
						id="title"
						autoComplete="title"
						register={register}
						name="Title"
						error={errors}
						required={true}
						autoCapitalize="false"
						placeholder="For e.g: 2 bed Furnished Apt at F10"
					/>
				</div>
				<div className="grid grid-cols-2 gap-x-24 gap-y-4">
					<div className="space-y-2">
						<label htmlFor="ContractType">
							Contract Type <span className="text-[#FF0000]">*</span>
						</label>
						<Controller
							name="ContractType"
							control={control}
							render={({ field: { onChange, value } }) => (
								<div className="flex space-x-16">
									<Checkbox
										labelText="Sale"
										name="ContractType"
										onChange={e => onChange(e.target.value)}
										value={ContractTypes.SALE}
										checked={value === ContractTypes.SALE}
									/>
									<Checkbox
										labelText="Rent"
										name="ContractType"
										onChange={e => onChange(e.target.value)}
										value={ContractTypes.RENT}
										checked={value === ContractTypes.RENT}
									/>
								</div>
							)}
						/>
						{errors && <p className="text-xs text-red-600">{errors.ContractType?.message}</p>}
					</div>
					<div className="space-y-2">
						<label htmlFor="PropertyType">
							Property Type <span className="text-[#FF0000]">*</span>
						</label>
						<Controller
							name="PropertyType"
							control={control}
							render={({ field: { onChange, value } }) => (
								<div className="flex justify-between flex-wrap">
									<Checkbox
										labelText="Residential"
										name="PropertyType"
										onChange={e => onChange(e.target.value)}
										value={PropertyTypes.RESIDENTIAL}
										checked={value === PropertyTypes.RESIDENTIAL}
									/>
									<Checkbox
										labelText="Commercial"
										name="PropertyType"
										onChange={e => onChange(e.target.value)}
										value={PropertyTypes.COMMERCIAL}
										checked={value === PropertyTypes.COMMERCIAL}
									/>
									<Checkbox
										labelText="Special Commercial"
										name="PropertyType"
										onChange={e => onChange(e.target.value)}
										value={PropertyTypes.SPECIAL}
										checked={value === PropertyTypes.SPECIAL}
									/>
								</div>
							)}
						/>
						{errors && <p className="text-xs text-red-600">{errors?.PropertyType?.message}</p>}
					</div>
					<div className="space-y-3">
						<div className="relative h-[80px] flex justify-end">
							<Input
								id="location"
								labelText="Location"
								autoComplete="location"
								disabled
								register={register}
								name="Location"
								error={errors}
								required={true}
								autoCapitalize="false"
								placeholder="Google Map Location"
							/>
							<BiCurrentLocation
								onClick={() => setShowMap(true)}
								className="h-5 w-5 absolute bottom-5 right-2 cursor-pointer"
								aria-hidden="true"
							/>
						</div>
						{<MapComponent onChange={handleMapData} show={showMap} setShow={setShowMap} />}
						<div className="flex space-x-8">
							<Controller
								name={'LandArea'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="area"
										labelText="Land Area"
										autoComplete="area"
										name="LandArea"
										error={errors}
										required={true}
										placeholder="Enter Area"
										onChange={onChange}
										value={value}
									/>
								)}
							/>
							<Select
								id="units"
								labelText="Units"
								autoComplete="units"
								register={register}
								name="Units"
								errors={errors}
								required={true}
								className="bg-[#E8E8E8]                                                "
								autoCapitalize="false">
								<option value="">Select a Unit</option>
								{Object.values(UnitTypes).map(unit => (
									<option key={unit} value={unit}>
										{unit}
									</option>
								))}
							</Select>
						</div>
						<div className="flex space-x-8">
							<Controller
								name={'Price'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="price"
										labelText="Price (Pkr)"
										autoComplete="price"
										name="Price"
										error={errors}
										required={true}
										currency={true}
										placeholder="Enter Price"
										onChange={onChange}
										value={value}
									/>
								)}
							/>
							<Controller
								name={'YearBuilt'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<DateInput
										id="year"
										value={editData?.YearBuilt}
										register={register}
										onCalendarClick={handleDate}
										placeholder="Enter year"
										prevValue={propertyDate}
										labelText="Year"
										autoComplete="year"
										name="YearBuilt"
										error={errors}
										required={true}
										year={true}
									/>
								)}
							/>
						</div>
					</div>
					<div>
						<div className="space-y-2">
							<label htmlFor="PropertyCategory">
								Property Category <span className="text-[#FF0000]">*</span>
							</label>
							<Controller
								name="PropertyCategory"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="grid grid-cols-2 gap-y-2">
										<Checkbox
											labelText="House"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="House"
											checked={value === 'House'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Penthouse"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="Penthouse"
											checked={value === 'Penthouse'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Apartment"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="Apartment"
											checked={value === 'Apartment'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Studio"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="Studio"
											checked={value === 'Studio'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Villa"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="Villa"
											checked={value === 'Villa'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Plot"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="Plot"
											checked={value === 'Plot'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Shop"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="Shop"
											checked={value === 'Shop'}
											disabled={
												property !== PropertyTypes.COMMERCIAL && property !== PropertyTypes.SPECIAL
													? true
													: false
											}
										/>
										<Checkbox
											labelText="Plaza"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="Plaza"
											checked={value === 'Plaza'}
											disabled={
												property !== PropertyTypes.COMMERCIAL && property !== PropertyTypes.SPECIAL
													? true
													: false
											}
										/>
										<Checkbox
											labelText="Agriculture Land"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="Agriculture land"
											checked={value === 'Agriculture land'}
											disabled={
												property !== PropertyTypes.COMMERCIAL && property !== PropertyTypes.SPECIAL
													? true
													: false
											}
										/>
									</div>
								)}
							/>
							{errors && <p className="text-xs text-red-600">{errors.PropertyCategory?.message}</p>}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const PropertyDetailsForm = ({
	register,
	errors,
	control,
	editData,
	category,
	setValue,
	propertyImages,
	setPropertyImages
}: FormProps) => {
	const handleUpload = (files: File[]) => {
		if (propertyImages) {
			setPropertyImages?.([...propertyImages, ...files])
		}
		setValue?.('sentPropertyImages', [...files])
	}

	return (
		<div className="space-y-4">
			<div className="sm:space-y-8">
				<div className="grid grid-cols-2 gap-x-24 gap-y-4">
					<div className="space-y-6">
						<Select
							id="city"
							labelText="City"
							autoComplete="city"
							register={register}
							name="City"
							errors={errors}
							required={true}
							className="bg-[#E8E8E8]                                                "
							autoCapitalize="false">
							{editData?.PropertyDetails.City && <option value={editData.PropertyDetails.City}>{editData.PropertyDetails.City}</option>}
							<option value="">Select a City</option>
							{Object.values(CityNames).map(unit => (
								<option key={unit} value={unit}>
									{unit}
								</option>
							))}
						</Select>

						<div className="flex space-x-8">
							<Controller
								name={'Housenumber'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="house"
										labelText={`${category} number`}
										autoComplete="house"
										name="Housenumber"
										error={errors}
										required={true}
										placeholder={`Enter ${category} number`}
										onChange={onChange}
										value={value}
									/>
								)}
							/>
							<Controller
								name={'Streetno'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="street"
										labelText="Street#"
										autoComplete="street"
										name="Streetno"
										error={errors}
										placeholder="Enter Street Number"
										onChange={onChange}
										value={value}
									/>
								)}
							/>
						</div>
						<div className="space-y-2">
							<FileUpload
								onUpload={handleUpload}
								data={propertyImages}
								setData={setPropertyImages}
								name="sentPropertyImages"
								labelText="Upload Images"
								error={errors}
								placeholder="Upload image file"
							/>
							<span className="text-sm">Select up to 10 images, File type: jpg, png, gif, pdf</span>
						</div>
					</div>
					<div className="space-y-2">
						<div className="flex space-x-8">
							<Input
								id="society"
								labelText="Society (if Any)"
								autoComplete="society"
								register={register}
								name="Society"
								error={errors}
								autoCapitalize="false"
								placeholder="Enter a Society"
							/>
							<Input
								id="places"
								labelText="Nearby Places"
								autoComplete="places"
								register={register}
								name="places"
								error={errors}
								autoCapitalize="false"
								placeholder="Enter a Nearby Place"
							/>
						</div>
						<div>
							<Input
								id="sector"
								labelText="Sector or Area"
								autoComplete="sector"
								register={register}
								name="Sector"
								error={errors}
								autoCapitalize="false"
								placeholder="Enter a Sector or Area"
							/>
						</div>
						<div className="flex space-x-2">
							<Controller
								name={'Bed'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="bed"
										labelText="Bed"
										autoComplete="bed"
										name="Bed"
										error={errors}
										onChange={onChange}
										value={value}
										maxLength={2}
									/>
								)}
							/>
							<Controller
								name={'Bath'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="bath"
										labelText="Bath"
										autoComplete="bath"
										name="Bath"
										error={errors}
										onChange={onChange}
										value={value}
										maxLength={2}
									/>
								)}
							/>
							<Controller
								name={'Kitchen'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="kitchen"
										labelText="Kitchen"
										autoComplete="kitchen"
										name="Kitchen"
										error={errors}
										onChange={onChange}
										value={value}
										maxLength={2}
									/>
								)}
							/>
						</div>
						<div className="flex space-x-8">
							<Input
								id="gas"
								labelText="Gas"
								autoComplete="gas"
								register={register}
								name="Gas"
								error={errors}
								autoCapitalize="false"
							/>
							<Input
								id="electricity"
								labelText="Electricity"
								autoComplete="electricity"
								register={register}
								name="Electricity"
								error={errors}
								autoCapitalize="false"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex space-x-4 items-center">
				<h3 className="whitespace-nowrap font-bold text-[#0D0C18]">Owner Details</h3>
				<div className="border-b border-gray-300 w-full"></div>
			</div>
			<div className="grid grid-cols-2 gap-x-24 gap-y-4">
				<div className="space-y-2">
					<Input
						labelText="Name"
						id="name"
						autoComplete="name"
						register={register}
						name="Name"
						error={errors}
						required={true}
						autoCapitalize="false"
						placeholder="Enter Name"
					/>
					<Input
						labelText="Address"
						id="address"
						autoComplete="address"
						register={register}
						name="Address"
						error={errors}
						required={true}
						autoCapitalize="false"
						placeholder="Enter Address"
					/>
					<Controller
						name={'CNIC'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<InputNumber
								labelText="CNIC"
								id="cnic"
								autoComplete="cnic"
								name="CNIC"
								onChange={onChange}
								value={value}
								error={errors}
								required={true}
								maxLength={13}
								autoCapitalize="false"
								placeholder="Enter CNIC"
							/>
						)}
					/>
					<label htmlFor="ligitation" className="block text-[#0D0C18]">
						Ligitation (If Any)
					</label>

					<Controller
						name="Ligitation"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<>
								<textarea
									id="ligitation"
									name="Ligitation"
									onChange={onChange}
									placeholder="Enter Ligitation"
									value={value ?? ''}
									rows={2}
									className="block placeholder-gray-500 w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								/>
								{error && <span className="text-xs text-red-600">{error.message}</span>}
							</>
						)}
					/>
				</div>
				<div className="space-y-4">
					<Controller
						name={'ContactNumber'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<InputNumber
								labelText="Contact Number"
								id="phone"
								onChange={onChange}
								value={value}
								autoComplete="phone"
								name="ContactNumber"
								error={errors}
								required={true}
								maxLength={11}
								autoCapitalize="false"
								placeholder="Enter Contact Number"
							/>
						)}
					/>
					<Controller
						name={'AlternateNumber'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<InputNumber
								labelText="Alternate Number"
								id="alternatephone"
								onChange={onChange}
								value={value}
								autoComplete="alternatephone"
								name="AlternateNumber"
								error={errors}
								maxLength={11}
								autoCapitalize="false"
								placeholder="Enter Alternate Number"
							/>
						)}
					/>
					<label htmlFor="description" className="block text-[#0D0C18]">
						Property / Owner Description
					</label>

					<Controller
						name="OwnerDescription"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<>
								<textarea
									id="description"
									name="OwnerDescription"
									onChange={onChange}
									placeholder="Enter Description"
									value={value ?? ''}
									rows={5}
									className="block placeholder-gray-500 w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								/>
								{error && <span className="text-xs text-red-600">{error.message}</span>}
							</>
						)}
					/>
				</div>
			</div>
		</div>
	)
}

const AddHistoryForm = ({
	register,
	errors,
	control,
	historyImages,
	setHistoryImages,
	LeaseDate,
	setLeaseDate,
	callDate,
	setCallDate,
	priceDate,
	setPriceDate,
	historyDate,
	editData,
	setHistoryDate,
	watch,
	setValue,
	showCommission,
	setShowCommission,
	getValues,
	recordCount = 1,
	setRecordCount,
	priceCount = 1,
	setPriceCount
}: FormProps) => {
	const { Roles } = useAppSelector(state => state.auth)
	const handleUpload = (files: File[]) => {
		if (historyImages) {
			setHistoryImages?.([...historyImages, ...files])
		}
		setValue?.('sentHistoryImages', [...files])
	}

	const handleHistoryDate = (value: string) => {
		setValue?.('Date', value)
		setHistoryDate?.(value)
	}

	const handleDate = (value: string) => {
		setValue?.('LeaseExpiringOn', value, { shouldValidate: true })
		setLeaseDate?.(value)
	}

	const callRecord = watch?.('Calltype')
	const occupancy = watch?.('OccupancyStatus')

	return (
		<div className={clsx('grid grid-cols-4 gap-x-8 gap-y-4')}>
			<div className={clsx('space-y-6', showCommission && 'hidden')}>
				<DateInput
					labelText="Date"
					type="date"
					value={editData?.AddHistory.Date}
					id="historydate"
					prevValue={historyDate}
					autoComplete="historydate"
					name="Date"
					onCalendarClick={handleHistoryDate}
					placeholder="2 Jan, 2023"
					autoCapitalize="false"
				/>
				<div>
					<label htmlFor="OccupancyStatus">Occupancy Status</label>
					<Controller
						name={'OccupancyStatus'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex flex-col bg-[#E6E6E6] p-3 space-y-2">
								<Radio
									labelText="Occupied"
									name="OccupancyStatus"
									onChange={e => onChange(e.target.value)}
									value="Occupied"
									checked={value === 'Occupied'}
								/>
								<Radio
									labelText="Vacant"
									name="OccupancyStatus"
									onChange={e => onChange(e.target.value)}
									value="Vacant"
									checked={value === 'Vacant'}
								/>
								<Radio
									labelText="Sold"
									name="OccupancyStatus"
									onChange={e => onChange(e.target.value)}
									value="Sold"
									checked={value === 'Sold'}
								/>
								<Radio
									labelText="Not Sold"
									name="OccupancyStatus"
									onChange={e => onChange(e.target.value)}
									value="NotSold"
									checked={value === 'NotSold'}
								/>
							</div>
						)}
					/>
				</div>

				<Controller
					name={'LeaseExpiringOn'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<DateInput
							register={register}
							value={editData?.AddHistory.LeaseExpiringOn}
							onCalendarClick={handleDate}
							error={errors}
							prevValue={LeaseDate}
							labelText="Lease Expiring on"
							id="leaseexpiry"
							autoComplete="leaseexpiry"
							name="LeaseexpiringOn"
							disabled={occupancy !== 'Occupied'}
							placeholder="31 Jan, 2025"
							autoCapitalize="false"
						/>
					)}
				/>

				{Roles !== 'surveyor' && (
					<div
						className={clsx(
							'bg-[#0D0C18] text-white py-2 px-2 justify-center space-x-4 font-semibold rounded-md flex items-center cursor-pointer'
						)}
						onClick={() => setShowCommission?.(true)}>
						<PlusIcon className="h-5 w-5 stroke-white" aria-hidden="true" />
						<span className="uppercase">Commision</span>
					</div>
				)}
			</div>
			<div className={clsx('col-span-3 space-y-2', showCommission && 'hidden')}>
				<div className="space-y-4">
					<div>
						<label htmlFor="historydetails" className="block text-[#0D0C18]">
							Add Details
						</label>
						<Controller
							name="AddDetails"
							control={control}
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<>
									<textarea
										id="adddetails"
										name="AddDetails"
										onChange={onChange}
										placeholder="Enter Details"
										value={value ?? ''}
										rows={Roles === 'surveyor' ? 6 : 2}
										className="block placeholder-gray-500 w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
									{error && <span className="text-xs text-red-600">{error.message}</span>}
								</>
							)}
						/>
					</div>
					<FileUpload
						onUpload={handleUpload}
						labelText="Upload Images"
						data={historyImages}
						setData={setHistoryImages}
						name="sentHistoryImages"
						id="historyimage"
						placeholder="Select upto 10 files, File Type: jpg, png, gif, pdf"
					/>
					{Roles !== 'surveyor' && (
						<Controller
							name={'Calltype'}
							control={control}
							render={({ field: { onChange, value } }) => (
								<div className="flex space-x-6">
									<Radio
										labelText="Incoming Call Record"
										name="CallType"
										onChange={e => onChange(e.target.value)}
										value="incoming"
										checked={value === 'incoming'}
									/>
									<Radio
										labelText="Outgoing Call Record"
										name="CallType"
										onChange={e => onChange(e.target.value)}
										value="outgoing"
										checked={value === 'outgoing'}
									/>
								</div>
							)}
						/>
					)}
					{Roles !== 'surveyor' &&
						callRecord &&
						Array.from({ length: recordCount }, (_, index) => (
							<CallRecord
								key={index}
								isFirst={index == 0}
								recordCount={recordCount}
								setRecordCount={setRecordCount}
								callDate={callDate}
								setCallDate={setCallDate}
								register={register}
								control={control}
								errors={errors}
								setValue={setValue}
								getValues={getValues}
								index={index}
							/>
						))}
					{Roles !== 'surveyor' &&
						Array.from({ length: priceCount }, (_, index) => (
							<PricingHistory
								key={index}
								isFirst={index == 0}
								priceCount={priceCount}
								setPriceCount={setPriceCount}
								register={register}
								priceDate={priceDate}
								setPriceDate={setPriceDate}
								control={control}
								errors={errors}
								watch={watch}
								setValue={setValue}
								index={index}
							/>
						))}
				</div>
			</div>
			{Roles !== 'surveyor' && (
				<div className="col-span-4">
					<Commission
						show={showCommission ?? false}
						register={register}
						control={control}
						errors={errors}
					/>
				</div>
			)}
		</div>
	)
}

export default PropertyForm
