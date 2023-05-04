import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { Input, InputNumber } from 'src/components/app/input'
import { ContractTypes, PropertyTypes, UnitTypes } from 'src/constants/constants'
import { PropertyForm } from 'src/types/typings'
import { Checkbox } from '../app/checkbox'
import { Select } from '../app/select'

const schema = yup.object<PropertyForm>().shape({
	title: yup.string().required('Title is required'),
	contract: yup.string().required('Contract type is required'),
	property: yup.string().required('Property type is required'),
	location: yup.string().required('Location is required'),
	area: yup.string().required('Land Area is required'),
	units: yup.string().required('Select a Unit'),
	price: yup.string().required('Price is required'),
	year: yup
		.string()
		.required('Year is required')
		.min(4, 'Enter a valid year')
		.max(4, 'Enter a valid year'),
	category: yup.string().required('Product Category is required')
})

const PropertyForm = () => {
	const [isUpdating, setUpdating] = useState(false)

	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<PropertyForm>({
		resolver: yupResolver(schema),

		mode: 'all'
	})

	const handleFormSubmit = (data: any) => {
		setUpdating(true)
	}

	const property = watch('property') ?? ''

	return (
		<div className="px-4 sm:px-4 lg:px-4">
			<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mb-3 sm:w-full w-full">
				<div className="flex items-center justify-end text-base ">
					<div>
						<Button type="submit" disabled={isUpdating} className="bg-black px-8">
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
						<div className="grid grid-cols-2 gap-x-32 gap-y-4">
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
								{errors.contract && (
									<p className="text-xs text-red-600">{errors.contract?.message}</p>
								)}
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
								{errors.property && (
									<p className="text-xs text-red-600">{errors.property?.message}</p>
								)}
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
												register={register}
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
														property !== PropertyTypes.COMMERCIAL &&
														property !== PropertyTypes.SPECIAL
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
														property !== PropertyTypes.COMMERCIAL &&
														property !== PropertyTypes.SPECIAL
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
														property !== PropertyTypes.COMMERCIAL &&
														property !== PropertyTypes.SPECIAL
															? true
															: false
													}
												/>
											</div>
										)}
									/>
									{errors.property && (
										<p className="text-xs text-red-600">{errors.property?.message}</p>
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

export default PropertyForm
