import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import * as yup from 'yup'
import { toast } from 'react-hot-toast'
import { BiCurrentLocation } from 'react-icons/bi'
import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { Input, InputNumber } from 'src/components/app/input'
import { ContractTypes, PropertyTypes, UnitTypes } from 'src/constants/constants'
import { AddPropertyFormValues } from 'src/constants/form-defaults'
import propertyService from 'src/services/property'
import { AddPropertyForm, Property } from 'src/types/typings'
import { Checkbox } from '../app/checkbox'
import { DateInput } from '../app/date'
import { MapComponent } from '../app/map'
import { Select } from '../app/select'
import ImportButton from './import-button'

interface AddPropertyFormProps {
	setId: Dispatch<SetStateAction<string>>
	setCurrentTab: Dispatch<SetStateAction<string>>
	setCategory: Dispatch<SetStateAction<string>>
	editData?: Property
	isNew?: boolean
}

const AddPropertyForm = ({ editData, setCurrentTab, setId, setCategory }: AddPropertyFormProps) => {
	const schema = yup.object<AddPropertyForm>().shape({
		Title: yup.string().required('Title is required'),
		ContractType: yup.string().required('Contract Type is required'),
		PropertyType: yup.string().required('Property Type is required'),
		Location: yup.string().required('Location is required'),
		LandArea: yup.string().required('Area is required'),
		Units: yup.string().required('Select a unit'),
		Price: yup.string().required('Price is required'),
		YearBuilt: yup.string().test('yearType', 'Year is required', function (value) {
			if (value) return true
			return false
		}),
		PropertyCategory: yup.string().required('Category is required')
	})

	const {
		register,
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm<AddPropertyForm>({
		resolver: yupResolver(schema as any),
		defaultValues: {
			...AddPropertyFormValues(editData)
		},
		mode: 'all'
	})

	const [propertyDate, setPropertyDate] = useState<string>('')

	const property = watch?.('PropertyType')
	const categoryValue = watch?.('PropertyCategory')

	const [showMap, setShowMap] = useState(false)
	const [updating, setUpdating] = useState(false)

	useEffect(() => {
		setCategory?.(categoryValue)
	}, [categoryValue])

	const addProperty = async (data: AddPropertyForm) => {
		const response = await propertyService.addProperty(data)
		if (response.success) {
			setId(response.data._id)
			toast.success('Property added successfully')
			setUpdating(false)
			setCurrentTab('Property Details')
		} else {
			toast.error('Property not added')
			setUpdating(false)
		}
	}

	const onFormSubmit = (data: AddPropertyForm) => {
		setUpdating(true)
		addProperty(data)
	}

	const handleDate = (value: string) => {
		setValue?.('YearBuilt', value, { shouldValidate: true })
		setPropertyDate?.(value)
	}

	const handleMapData = (lat: number, lng: number) => {
		setValue?.('Location', `lat: ${lat.toFixed(2)}, lng: ${lng.toFixed(2)}`, {
			shouldValidate: true
		})
	}

	const uploadFile = async (propertyData: FormData) => {
		const response = await propertyService.uploadFile(propertyData)
		if (response.success) {
			toast.success('Property File Uploaded Successfully')
			return response
		} else {
			toast.error(response.message)
		}
	}

	const handleFileUpload = (file: File) => {
		const propertyFormData = new FormData()
		propertyFormData.append('file', file)
		uploadFile(propertyFormData)
	}

	return (
		<div className="px-4 sm:px-4 lg:px-4">
			<form className="space-y-2 mb-3 sm:w-full w-full" onSubmit={handleSubmit(onFormSubmit)}>
				<div className="flex items-center justify-end text-base ">
					<div className="flex space-x-3">
						<div className="flex gap-x-40">
							<ImportButton onUpload={handleFileUpload} />
						</div>
						<Button type="submit" disabled={updating} className="bg-black px-6">
							{updating ? (
								<>
									<Spinner className="w-5 h-5" />
									<span className="ml-2">Updating...</span>
								</>
							) : (
								<span className="uppercase whitespace-nowrap">Save</span>
							)}
						</Button>
					</div>
				</div>

				<div className="text-right text-green-500 mr-24">
					<a className="whitespace-nowrap" href="/sample/Property.xlsx" target="_blank" download>
						View Property Sheet
					</a>
				</div>

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
								{showMap && (
									<MapComponent onChange={handleMapData} show={showMap} setShow={setShowMap} />
								)}
								<div className="flex space-x-8">
									<InputNumber
										id="area"
										labelText="Land Area"
										register={register}
										autoComplete="area"
										name="LandArea"
										error={errors}
										required={true}
										placeholder="Enter Area"
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
									<InputNumber
										id="price"
										labelText="Price (Pkr)"
										autoComplete="price"
										name="Price"
										error={errors}
										required={true}
										currency={true}
										placeholder="Enter Price"
										register={register}
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
														property !== PropertyTypes.COMMERCIAL &&
														property !== PropertyTypes.SPECIAL
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
														property !== PropertyTypes.COMMERCIAL &&
														property !== PropertyTypes.SPECIAL
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
														property !== PropertyTypes.COMMERCIAL &&
														property !== PropertyTypes.SPECIAL
															? true
															: false
													}
												/>
											</div>
										)}
									/>
									{errors && (
										<p className="text-xs text-red-600">{errors.PropertyCategory?.message}</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default AddPropertyForm
