import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
	Control,
	Controller,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormResetField,
	UseFormSetValue,
	UseFormWatch,
	useForm
} from 'react-hook-form'

import * as yup from 'yup'

import { PlusIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { Input, InputNumber } from 'src/components/app/input'
import { CityNames, ContractTypes, PropertyTypes, UnitTypes } from 'src/constants/constants'
import { Property } from 'src/types/typings'
import { Checkbox } from '../app/checkbox'
import { DateInput } from '../app/date'
import FileUpload from '../app/file-upload'
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
		}>
	>
	setCurrentTab: Dispatch<SetStateAction<string>>
}

enum FormSteps {
	ADDPROPERTY = 1,
	PROPERTYDETAILS = 2,
	ADDHISTORY = 3,
	COMPLETE
}

type StateType = {
	step: FormSteps
}

const PropertyForm = ({ currentTab, setActive, setCurrentTab }: PropertyFormProps) => {
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
					console.log(value)

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
		setValue,
		getValues,
		formState: { errors }
	} = useForm<Property>({
		resolver: yupResolver(schema as any),
		context: { step: state.step },
		mode: 'all'
	})

	const [category, setCategory] = useState<string>()
	const [showCommission, setShowCommission] = useState(false)

	let component

	switch (state.step) {
		case FormSteps.ADDPROPERTY:
			component = (
				<AddPropertyForm {...{ errors, register, control, watch, setCategory, setValue }} />
			)
			break
		case FormSteps.PROPERTYDETAILS:
			component = <PropertyDetailsForm {...{ errors, register, control, category }} />
			break
		case FormSteps.ADDHISTORY:
			component = (
				<AddHistoryForm
					{...{
						errors,
						register,
						control,
						watch,
						setValue,
						getValues,
						showCommission,
						setShowCommission
					}}
				/>
			)
			break
		default:
			component = null
	}

	const renderComponent = component

	const nextStep = handleSubmit(data => {
		setState(prevState => ({
			...prevState,
			step: prevState.step + 1
		}))
		setActive(prev => {
			return {
				addHistory: prev.propertyDetails ? true : false,
				propertyDetails: true
			}
		})
	})

	useEffect(() => {
		if (state.step === FormSteps.ADDPROPERTY) {
			setCurrentTab('Add Property')
		} else if (state.step === FormSteps.PROPERTYDETAILS) {
			setCurrentTab('Property Details')
		} else {
			setCurrentTab('Add History')
		}
	}, [state])

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
		} else {
			setState(prevState => ({
				...prevState,
				step: FormSteps.ADDHISTORY
			}))
		}
	}, [currentTab])

	const [isUpdating, setUpdating] = useState(false)

	const onSubmit = handleSubmit(data => {
		console.log('DDDDDD', data)

		// setUpdating(true)
	})

	return (
		<div className="px-4 sm:px-4 lg:px-4">
			<form
				className="space-y-2 mb-3 sm:w-full w-full"
				onSubmit={event => {
					if (state.step === FormSteps.COMPLETE) {
						onSubmit(event)
					} else {
						setShowCommission(false)
						nextStep(event)
					}
				}}>
				<div className="flex items-center justify-end text-base ">
					<div className="flex space-x-3">
						{showCommission && (
							<button
								type="button"
								onClick={() => setShowCommission(false)}
								className="text-[#485276] px-8 border border-gray-300 rounded-md">
								<span className="uppercase">Close</span>
							</button>
						)}
						<Button type="submit" disabled={isUpdating} className="bg-black px-6">
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
	resetField?: UseFormResetField<Property>
	watch?: UseFormWatch<Property>
	setCategory?: Dispatch<SetStateAction<string | undefined>>
	category?: string
	showCommission?: boolean
	setShowCommission?: Dispatch<SetStateAction<boolean>>
}

const AddPropertyForm = ({
	register,
	errors,
	control,
	watch,
	setCategory,
	setValue
}: FormProps) => {
	const property = watch?.('PropertyType')
	const category = watch?.('PropertyCategory')

	useEffect(() => {
		setCategory?.(category)
	}, [category])

	const handleDate = (value: string) => {
		setValue?.('YearBuilt', value, { shouldValidate: true })
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
						<Input
							id="location"
							labelText="Location"
							autoComplete="location"
							register={register}
							name="Location"
							error={errors}
							required={true}
							autoCapitalize="false"
							placeholder="Google Map Location"
						/>
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
										type="date"
										register={register}
										onCalendarClick={handleDate}
										placeholder="Enter year"
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
											value="house"
											checked={value === 'house'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Penthouse"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="penthouse"
											checked={value === 'penthouse'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Apartment"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="apartment"
											checked={value === 'apartment'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Studio"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="studio"
											checked={value === 'studio'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Villa"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="villa"
											checked={value === 'villa'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Plot"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="plot"
											checked={value === 'plot'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Shop"
											name="PropertyCategory"
											onChange={e => onChange(e.target.value)}
											value="shop"
											checked={value === 'shop'}
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
											value="plaza"
											checked={value === 'plaza'}
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
											value="agriculture land"
											checked={value === 'agriculture land'}
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

const PropertyDetailsForm = ({ register, errors, control, category }: FormProps) => {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

	const handleUpload = (files: File[]) => {
		setUploadedFiles([...uploadedFiles, ...files])
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
								name="propertyimages"
								labelText="Upload Images"
								error={errors}
								placeholder="Upload image file"
							/>
							<span className="text-sm">Select up to 10 images, File type: jpg, png, gif, pdf</span>
						</div>
					</div>
					<div className="space-y-2">
						<div className="flex space-x-8">
							<Select
								id="society"
								labelText="Society (if Any)"
								autoComplete="society"
								register={register}
								name="Society"
								errors={errors}
								className="bg-[#E8E8E8]                                                "
								autoCapitalize="false">
								<option value="">Select a Society</option>
								{Object.values(UnitTypes).map(unit => (
									<option key={unit} value={unit}>
										{unit}
									</option>
								))}
							</Select>
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
	watch,
	setValue,
	showCommission,
	setShowCommission,
	getValues
}: FormProps) => {
	const [priceCount, setPriceCount] = useState(1)
	const [recordCount, setRecordCount] = useState(1)

	const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

	const handleUpload = (files: File[]) => {
		setUploadedFiles([...uploadedFiles, ...files])
	}

	const handleDate = (value: string) => {
		setValue?.('LeaseExpiringOn', value, { shouldValidate: true })
	}

	const callRecord = watch?.('CallType')
	const occupancy = watch?.('OccupancyStatus')

	return (
		<div className="grid grid-cols-4 gap-x-8 gap-y-4">
			<div className={clsx('space-y-6', showCommission && 'hidden')}>
				<DateInput
					labelText="Date"
					type="date"
					id="historydate"
					autoComplete="historydate"
					name="Date"
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
									value="occupied"
									checked={value === 'occupied'}
								/>
								<Radio
									labelText="Vacant"
									name="OccupancyStatus"
									onChange={e => onChange(e.target.value)}
									value="vacant"
									checked={value === 'vacant'}
								/>
								<Radio
									labelText="Sold"
									name="OccupancyStatus"
									onChange={e => onChange(e.target.value)}
									value="sold"
									checked={value === 'sold'}
								/>
								<Radio
									labelText="Not Sold"
									name="OccupancyStatus"
									onChange={e => onChange(e.target.value)}
									value="notsold"
									checked={value === 'notsold'}
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
							onCalendarClick={handleDate}
							error={errors}
							labelText="Lease Expiring on"
							id="leaseexpiry"
							autoComplete="leaseexpiry"
							name="LeaseexpiringOn"
							disabled={occupancy !== 'occupied'}
							placeholder="31 Jan, 2025"
							autoCapitalize="false"
						/>
					)}
				/>

				<div
					className={clsx(
						'bg-[#0D0C18] text-white py-2 px-2 justify-center space-x-4 font-semibold rounded-md flex items-center cursor-pointer'
					)}
					onClick={() => setShowCommission?.(true)}>
					<PlusIcon className="h-5 w-5 stroke-white" aria-hidden="true" />
					<span className="uppercase">Commision</span>
				</div>
			</div>
			<div className={clsx('col-span-3 space-y-2', showCommission && 'hidden')}>
				<div className="space-y-4">
					<div>
						<label htmlFor="historydetails" className="block text-[#0D0C18]">
							Add Details
						</label>
						<Controller
							name="HistoryDetails"
							control={control}
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<>
									<textarea
										id="historydetails"
										name="HistoryDetails"
										onChange={onChange}
										placeholder="Enter Details"
										value={value ?? ''}
										rows={2}
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
						name="HistoryImages"
						id="historyimage"
						placeholder="Select upto 10 files, File Type: jpg, png, gif, pdf"
					/>
					<Controller
						name={'CallType'}
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
					{callRecord &&
						Array.from({ length: recordCount }, (_, index) => (
							<CallRecord
								key={index}
								isFirst={index == 0}
								recordCount={recordCount}
								setRecordCount={setRecordCount}
								register={register}
								control={control}
								errors={errors}
								setValue={setValue}
								getValues={getValues}
								index={index}
							/>
						))}
					{Array.from({ length: priceCount }, (_, index) => (
						<PricingHistory
							key={index}
							isFirst={index == 0}
							priceCount={priceCount}
							setPriceCount={setPriceCount}
							register={register}
							control={control}
							errors={errors}
							watch={watch}
							setValue={setValue}
							index={index}
						/>
					))}
				</div>
			</div>
			<div className="col-span-4">
				<Commission
					show={showCommission ?? false}
					register={register}
					control={control}
					errors={errors}
				/>
			</div>
		</div>
	)
}

export default PropertyForm
