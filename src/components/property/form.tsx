import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
	Control,
	Controller,
	FieldErrors,
	UseFormRegister,
	UseFormResetField,
	UseFormSetValue,
	UseFormWatch,
	useForm
} from 'react-hook-form'

import * as yup from 'yup'

import { PlusIcon } from '@heroicons/react/20/solid'
import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { Input, InputNumber } from 'src/components/app/input'
import { ContractTypes, PropertyTypes, UnitTypes } from 'src/constants/constants'
import { PropertyFormType } from 'src/types/typings'
import { Checkbox } from '../app/checkbox'
import FileUpload from '../app/file-upload'
import { Radio } from '../app/radio'
import { Select } from '../app/select'
import CallRecord from './call-record'
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

	const schema = yup.object({
		title: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Title is required')
		}),
		contract: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Contract Type is required')
		}),
		property: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Property Type is required')
		}),
		location: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Location is required')
		}),
		area: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Area is required')
		}),
		units: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Select a unit')
		}),
		price: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Price is required')
		}),
		year: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Year is required')
		}),
		category: yup.string().when('$step', {
			is: FormSteps.ADDPROPERTY,
			then: schema => schema.required('Category is required')
		}),
		city: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema => schema.required('City is required')
		}),
		house: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema => schema.required('House number is required')
		}),
		gas: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema =>
				schema.nullable().oneOf([null, 'yes', 'no'], 'Gas must be either "yes" or "no" or empty')
		}),
		electricity: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema =>
				schema
					.nullable()
					.oneOf([null, 'yes', 'no'], 'Electricity must be either "yes" or "no" or empty')
		}),
		name: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema => schema.required('Name is required')
		}),
		address: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema => schema.required('Address is required')
		}),
		phone: yup.string().when('$step', {
			is: FormSteps.PROPERTYDETAILS,
			then: schema =>
				schema
					.required('Contact number is a required field')
					.min(11, 'Phone number should be 11 digits')
					.max(11, 'Phone number should be 11 digits')
		}),
		cnic: yup.string().when('$step', {
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
		formState: { errors }
	} = useForm<PropertyFormType>({
		resolver: yupResolver(schema as any),
		context: { step: state.step },
		mode: 'all'
	})

	const [category, setCategory] = useState<string>()

	let component

	switch (state.step) {
		case FormSteps.ADDPROPERTY:
			component = <AddPropertyForm {...{ errors, register, control, watch, setCategory }} />
			break
		case FormSteps.PROPERTYDETAILS:
			component = <PropertyDetailsForm {...{ errors, register, control, category }} />
			break
		case FormSteps.ADDHISTORY:
			component = <AddHistoryForm {...{ errors, register, control, watch }} />
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
						nextStep(event)
					}
				}}>
				<div className="flex items-center justify-end text-base ">
					<div>
						<Button type="submit" disabled={isUpdating} className="bg-black px-6">
							{isUpdating ? (
								<>
									<Spinner className="w-5 h-5" />
									<span className="ml-2">Updating...</span>
								</>
							) : (
								<span className="uppercase">Save</span>
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
	register?: UseFormRegister<PropertyFormType>
	errors?: FieldErrors<PropertyFormType>
	control?: Control<PropertyFormType, any>
	setValue?: UseFormSetValue<PropertyFormType>
	resetField?: UseFormResetField<PropertyFormType>
	watch?: UseFormWatch<PropertyFormType>
	setCategory?: Dispatch<SetStateAction<string | undefined>>
	category?: string
}

const AddPropertyForm = ({ register, errors, control, watch, setCategory }: FormProps) => {
	const property = watch?.('property')
	const category = watch?.('category')

	useEffect(() => {
		setCategory?.(category)
	}, [category])

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
						name="title"
						error={errors}
						required={true}
						autoCapitalize="false"
						placeholder="For e.g: 2 bed Furnished Apt at F10"
					/>
				</div>
				<div className="grid grid-cols-2 gap-x-24 gap-y-4">
					<div className="space-y-2">
						<label htmlFor="contract">
							Contract Type <span className="text-[#FF0000]">*</span>
						</label>
						<Controller
							name="contract"
							control={control}
							render={({ field: { onChange, value } }) => (
								<div className="flex space-x-16">
									<Checkbox
										labelText="Sale"
										name="contract"
										onChange={e => onChange(e.target.value)}
										value={ContractTypes.SALE}
										checked={value === ContractTypes.SALE}
									/>
									<Checkbox
										labelText="Rent"
										name="contract"
										onChange={e => onChange(e.target.value)}
										value={ContractTypes.RENT}
										checked={value === ContractTypes.RENT}
									/>
								</div>
							)}
						/>
						{errors && <p className="text-xs text-red-600">{errors.contract?.message}</p>}
					</div>
					<div className="space-y-2">
						<label htmlFor="property">
							Property Type <span className="text-[#FF0000]">*</span>
						</label>
						<Controller
							name="property"
							control={control}
							render={({ field: { onChange, value } }) => (
								<div className="flex justify-between flex-wrap">
									<Checkbox
										labelText="Residential"
										name="property"
										onChange={e => onChange(e.target.value)}
										value={PropertyTypes.RESIDENTIAL}
										checked={value === PropertyTypes.RESIDENTIAL}
									/>
									<Checkbox
										labelText="Commercial"
										name="property"
										onChange={e => onChange(e.target.value)}
										value={PropertyTypes.COMMERCIAL}
										checked={value === PropertyTypes.COMMERCIAL}
									/>
									<Checkbox
										labelText="Special Commercial"
										name="property"
										onChange={e => onChange(e.target.value)}
										value={PropertyTypes.SPECIAL}
										checked={value === PropertyTypes.SPECIAL}
									/>
								</div>
							)}
						/>
						{errors && <p className="text-xs text-red-600">{errors?.property?.message}</p>}
					</div>
					<div className="space-y-3">
						<Input
							id="location"
							labelText="Location"
							autoComplete="location"
							register={register}
							name="location"
							error={errors}
							required={true}
							autoCapitalize="false"
							placeholder="Google Map Location"
						/>
						<div className="flex space-x-8">
							<Controller
								name={'area'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="area"
										labelText="Land Area"
										autoComplete="area"
										name="area"
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
								name="units"
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
								name={'price'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="price"
										labelText="Price (Pkr)"
										autoComplete="price"
										name="price"
										error={errors}
										required={true}
										placeholder="Enter Price"
										onChange={onChange}
										value={value}
									/>
								)}
							/>
							<Controller
								name={'year'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="year"
										labelText="Year"
										autoComplete="year"
										maxLength={4}
										name="year"
										error={errors}
										required={true}
										placeholder="Enter Year"
										onChange={onChange}
										value={value}
									/>
								)}
							/>
						</div>
					</div>
					<div>
						<div className="space-y-2">
							<label htmlFor="category">
								Property Category <span className="text-[#FF0000]">*</span>
							</label>
							<Controller
								name="category"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="grid grid-cols-2 gap-y-2">
										<Checkbox
											labelText="House"
											name="category"
											onChange={e => onChange(e.target.value)}
											value="house"
											checked={value === 'house'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Penthouse"
											name="category"
											onChange={e => onChange(e.target.value)}
											value="penthouse"
											checked={value === 'penthouse'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Apartment"
											name="category"
											onChange={e => onChange(e.target.value)}
											value="apartment"
											checked={value === 'apartment'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Studio"
											name="category"
											onChange={e => onChange(e.target.value)}
											value="studio"
											checked={value === 'studio'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Villa"
											name="category"
											onChange={e => onChange(e.target.value)}
											value="villa"
											checked={value === 'villa'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Plot"
											name="category"
											onChange={e => onChange(e.target.value)}
											value="plot"
											checked={value === 'plot'}
											disabled={property !== PropertyTypes.RESIDENTIAL ? true : false}
										/>
										<Checkbox
											labelText="Shop"
											name="category"
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
											name="category"
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
											name="category"
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
							{errors && <p className="text-xs text-red-600">{errors.category?.message}</p>}
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
	watch,
	setValue,
	category
}: FormProps) => {
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
							name="city"
							errors={errors}
							required={true}
							className="bg-[#E8E8E8]                                                "
							autoCapitalize="false">
							<option value="">Select a City</option>
							{Object.values(UnitTypes).map(unit => (
								<option key={unit} value={unit}>
									{unit}
								</option>
							))}
						</Select>

						<div className="flex space-x-8">
							<Controller
								name={'house'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="house"
										labelText={`${category} number`}
										autoComplete="house"
										name="house"
										error={errors}
										required={true}
										placeholder={`Enter ${category} number`}
										onChange={onChange}
										value={value}
									/>
								)}
							/>
							<Controller
								name={'street'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="street"
										labelText="Street#"
										autoComplete="street"
										name="street"
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
								labelText="Upload Images"
								name="image"
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
								name="society"
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
								name="sector"
								error={errors}
								autoCapitalize="false"
								placeholder="Enter a Sector or Area"
							/>
						</div>
						<div className="flex space-x-2">
							<Controller
								name={'bed'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="bed"
										labelText="Bed"
										autoComplete="bed"
										name="bed"
										error={errors}
										onChange={onChange}
										value={value}
										maxLength={2}
									/>
								)}
							/>
							<Controller
								name={'bath'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="bath"
										labelText="Bath"
										autoComplete="bath"
										name="bath"
										error={errors}
										onChange={onChange}
										value={value}
										maxLength={2}
									/>
								)}
							/>
							<Controller
								name={'kitchen'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputNumber
										id="kitchen"
										labelText="Kitchen"
										autoComplete="kitchen"
										name="kitchen"
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
								name="gas"
								error={errors}
								autoCapitalize="false"
							/>
							<Input
								id="electricity"
								labelText="Electricity"
								autoComplete="electricity"
								register={register}
								name="electricity"
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
						name="name"
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
						name="address"
						error={errors}
						required={true}
						autoCapitalize="false"
						placeholder="Enter Address"
					/>
					<Controller
						name={'cnic'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<InputNumber
								labelText="CNIC"
								id="cnic"
								autoComplete="cnic"
								name="cnic"
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
						name="ligitation"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<>
								<textarea
									id="ligitation"
									name="ligitation"
									onChange={onChange}
									placeholder="Enter Ligitation"
									value={value ?? ''}
									rows={2}
									className="block placeholder-[#0D0C18] w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								/>
								{error && <span className="text-xs text-red-600">{error.message}</span>}
							</>
						)}
					/>
				</div>
				<div className="space-y-4">
					<Controller
						name={'phone'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<InputNumber
								labelText="Contact Number"
								id="phone"
								onChange={onChange}
								value={value}
								autoComplete="phone"
								name="phone"
								error={errors}
								required={true}
								maxLength={11}
								autoCapitalize="false"
								placeholder="Enter Contact Number"
							/>
						)}
					/>
					<Controller
						name={'alternatephone'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<InputNumber
								labelText="Alternate Number"
								id="alternatephone"
								onChange={onChange}
								value={value}
								autoComplete="alternatephone"
								name="alternatephone"
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
						name="description"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<>
								<textarea
									id="description"
									name="description"
									onChange={onChange}
									placeholder="Enter Description"
									value={value ?? ''}
									rows={5}
									className="block placeholder-[#0D0C18] w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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

const AddHistoryForm = ({ register, errors, control, watch, setValue }: FormProps) => {
	const [priceCount, setPriceCount] = useState(1)
	const [recordCount, setRecordCount] = useState(1)

	const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

	const handleUpload = (files: File[]) => {
		setUploadedFiles([...uploadedFiles, ...files])
	}
	const callRecord = watch?.('callrecord')

	return (
		<div className="grid grid-cols-4 gap-x-8 gap-y-4">
			<div className="space-y-6">
				<Input
					labelText="Date"
					type="date"
					id="historydate"
					autoComplete="historydate"
					register={register}
					name="historydate"
					error={errors}
					placeholder="2 Jan, 2023"
					autoCapitalize="false"
				/>
				<div>
					<label htmlFor="occupancy">Occupancy Status</label>
					<Controller
						name={'occupancy'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex flex-col bg-[#E6E6E6] p-3 space-y-2">
								<Radio
									labelText="Occupied"
									name="occupancy"
									onChange={e => onChange(e.target.value)}
									value="occupied"
									checked={value === 'occupied'}
								/>
								<Radio
									labelText="Vacant"
									name="occupancy"
									onChange={e => onChange(e.target.value)}
									value="vacant"
									checked={value === 'vacant'}
								/>
								<Radio
									labelText="Sold"
									name="occupancy"
									onChange={e => onChange(e.target.value)}
									value="sold"
									checked={value === 'sold'}
								/>
								<Radio
									labelText="Not Sold"
									name="occupancy"
									onChange={e => onChange(e.target.value)}
									value="notsold"
									checked={value === 'notsold'}
								/>
							</div>
						)}
					/>
				</div>

				<Input
					labelText="Lease Expiring on"
					type="date"
					id="leaseexpiry"
					autoComplete="leaseexpiry"
					register={register}
					name="leaseexpiry"
					error={errors}
					disabled={true}
					placeholder="31 Jan, 2025"
					autoCapitalize="false"
				/>

				<div className="bg-[#0D0C18] text-white py-2 px-2 justify-center space-x-4 font-semibold rounded-md flex items-center">
					<PlusIcon className="h-5 w-5 stroke-white" aria-hidden="true" />
					<span className="uppercase">Commision</span>
				</div>
			</div>
			<div className="col-span-3 space-y-2">
				<div className="space-y-4">
					<div>
						<label htmlFor="historydetails" className="block text-[#0D0C18]">
							Add Details
						</label>
						<Controller
							name="historydetails"
							control={control}
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<>
									<textarea
										id="historydetails"
										name="historydetails"
										onChange={onChange}
										placeholder="Enter Details"
										value={value ?? ''}
										rows={2}
										className="block placeholder-[#0D0C18] w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
									{error && <span className="text-xs text-red-600">{error.message}</span>}
								</>
							)}
						/>
					</div>
					<FileUpload
						onUpload={handleUpload}
						labelText="Upload Images"
						name="historyimage"
						id="historyimage"
						placeholder="Select upto 10 files, File Type: jpg, png, gif, pdf"
					/>
					<Controller
						name={'callrecord'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex space-x-6">
								<Radio
									labelText="Incoming Call Record"
									name="callrecord"
									onChange={e => onChange(e.target.value)}
									value="incoming"
									checked={value === 'incoming'}
								/>
								<Radio
									labelText="Outgoing Call Record"
									name="callrecord"
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
							/>
						))}
					{Array.from({ length: priceCount }, (_, index) => (
						<PricingHistory
							key={index}
							isFirst={index == 0}
							priceCount={priceCount}
							setPriceCount={setPriceCount}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default PropertyForm
