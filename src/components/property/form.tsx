import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { Input, InputNumber } from 'src/components/app/input'
import { AppLayout } from 'src/components/app/layout'
import { ContractTypes, PropertyTypes, UnitTypes } from 'src/constants/constants'
import { PropertyForm } from 'src/types/typings'
import { Checkbox } from '../app/checkbox'
import { Container } from '../app/container'
import { AppHeader } from '../app/header'
import { Select } from '../app/select'
import { PropertyHeader } from './header'

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
		<AppLayout>
			<AppHeader />
			<Container>
				<PropertyHeader />
				<div className="px-4 sm:px-4 lg:px-4">
					<form
						onSubmit={handleSubmit(handleFormSubmit)}
						className="space-y-4 mb-3 sm:w-full w-full">
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
															disabled={property === PropertyTypes.RESIDENTIAL ? true : false}
														/>
														<Checkbox
															labelText="Plaza"
															name="category"
															onChange={e => onChange(e.target.value)}
															value="plaza"
															checked={value === 'plaza'}
															disabled={property === PropertyTypes.RESIDENTIAL ? true : false}
														/>
														<Checkbox
															labelText="Agriculture Land"
															name="category"
															onChange={e => onChange(e.target.value)}
															value="agriculture land"
															checked={value === 'agriculture land'}
															disabled={property === PropertyTypes.RESIDENTIAL ? true : false}
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

								{/* <div className="flex justify-between">
									<div>
										<div className="justify-between max-sm:flex-col">
											<label htmlFor="contract" className="block text-sm font-small text-[#717B9D]">
												Contract Type
												<span className="text-[#FF0000]"> *</span>
											</label>
											<div className="flex items-center">
												<input type="radio" {...register('contract')} value={ContractTypes.SALE} />
												<label
													htmlFor="sale"
													className="ml-3 block text-base leading-2 border-gray-300 text-gray-900">
													Sale
												</label>
											</div>
											<div className="flex items-center">
												<input type="radio" {...register('contract')} value={ContractTypes.RENT} />
												<label
													htmlFor="rent"
													className="ml-3 block text-base leading-2 border-gray-300 text-gray-900">
													Rent
												</label>
											</div>
										</div>
										{errors.contract && (
											<p className="text-xs text-red-600">{errors.contract.message}</p>
										)}
									</div>
									<div>
										<div className="justify-between max-sm:flex-col">
											<label htmlFor="property" className="block text-sm font-small text-[#717B9D]">
												Property Type
												<span className="text-[#FF0000]"> *</span>
											</label>
											<div className="flex items-center">
												<input
													type="radio"
													{...register('property')}
													value={PropertyTypes.RESIDENTIAL}
												/>
												<label
													htmlFor="residential"
													className="ml-3 block text-base leading-2 border-gray-300 text-gray-900">
													Sale
												</label>
											</div>
											<div className="flex items-center">
												<input
													type="radio"
													{...register('property')}
													value={PropertyTypes.COMMERCIAL}
												/>
												<label
													htmlFor="commercial"
													className="ml-3 block text-base leading-2 border-gray-300 text-gray-900">
													Rent
												</label>
											</div>
											<div className="flex items-center">
												<input
													type="radio"
													{...register('property')}
													value={PropertyTypes.SPECIAL}
												/>
												<label
													htmlFor="special"
													className="ml-3 block text-base leading-2 border-gray-300 text-gray-900">
													Rent
												</label>
											</div>
										</div>
										{errors.contract && (
											<p className="text-xs text-red-600">{errors.contract.message}</p>
										)}
									</div>
								</div> */}

								{/* <Input
									labelText="Email ID"
									type="email"
									id="email"
									autoComplete="email"
									register={register}
									name="email"
									error={errors}
									required={true}
									autoCapitalize="false"
									placeholder="Enter Email"
								/>
							</div>
							<div className="flex sm:space-x-8 max-sm:flex-col">
								<div className="relative w-full">
									<Input
										labelText="Password"
										id="password"
										autoComplete="password"
										register={register}
										name="password"
										type={togglePassword ? 'text' : 'password'}
										error={errors}
										required={true}
										autoCapitalize="false"
										placeholder="Enter Password"
									/>
									<div
										onClick={() => setTogglePassword(!togglePassword)}
										className={clsx(
											'absolute inset-y-0 flex cursor-pointer items-center right-2 top-6',
											Object.keys(errors).length !== 0 && 'top-2'
										)}>
										{<ShowHidePassword open={togglePassword} />}
									</div>
								</div>
								<div className="relative w-full">
									<Input
										labelText="Confirm Password"
										id="confirmPassword"
										autoComplete="confirmPassword"
										type={toggleConfirmPassword ? 'text' : 'password'}
										register={register}
										name="confirmPassword"
										error={errors}
										required={true}
										autoCapitalize="false"
										placeholder="Enter Password Again"
									/>
									<div
										onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
										className={clsx(
											'absolute inset-y-0 flex cursor-pointer items-center right-2 top-6',
											Object.keys(errors).length !== 0 && 'top-2'
										)}>
										{<ShowHidePassword open={toggleConfirmPassword} />}
									</div>
								</div>
							</div>
							<div className="flex sm:space-x-8 max-sm:flex-col">
								<InputNumber
									labelText="CNIC"
									id="cnic"
									autoComplete="cnic"
									name="cnic"
									error={errors}
									required={true}
									maxLength={13}
									autoCapitalize="false"
									placeholder="Enter CNIC"
								/>

								<InputNumber
									labelText="Contact Number"
									id="phone"
									autoComplete="phone"
									name="phone"
									error={errors}
									required={true}
									maxLength={11}
									autoCapitalize="false"
									placeholder="Enter Contact Number"
								/>
							</div>
							<div className="col-span-full">
								<label htmlFor="address" className="block text-sm font-small text-[#717B9D]">
									Address
								</label>
								<div className="mt-2">
									<Controller
										name="address"
										control={control}
										rules={{ required: true }}
										render={({ field: { onChange, value }, fieldState: { error } }) => (
											<>
												<textarea
													id="address"
													name="address"
													onChange={onChange}
													placeholder="Enter Address"
													value={value ?? ''}
													rows={2}
													className="block placeholder-[#0D0C18] w-full appearance-none bg-[#E6E6E6] rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
												/>
												{error && <span className="text-xs text-red-600">{error.message}</span>}
											</>
										)}
									/>
								</div>
							</div>
							<div>
								<div className="flex justify-between max-sm:flex-col">
									<label htmlFor="rights" className="block text-sm font-small text-[#717B9D]">
										User Rights
										<span style={{ color: 'red' }}> *</span>
									</label>
									<div className="flex items-center">
										<input type="checkbox" {...register('rights')} value={UserRightsTypes.ADD} />
										<label
											htmlFor="add"
											className="ml-3 block text-base leading-2 border-gray-300 text-gray-900">
											Add Property
										</label>
									</div>
									<div className="flex items-center">
										<input type="checkbox" {...register('rights')} value={UserRightsTypes.EDIT} />
										<label
											htmlFor="edit"
											className="ml-3 block text-base leading-2 border-gray-300 text-gray-900">
											Edit Property
										</label>
									</div>
									<div className="flex items-center">
										<input {...register('rights')} type="checkbox" value={UserRightsTypes.VIEW} />
										<label
											htmlFor="view"
											className="ml-3 block text-base leading-2 border-gray-300 text-gray-900">
											View Property
										</label>
									</div>
								</div>
								{errors.rights && <p className="text-xs text-red-600">{errors.rights.message}</p>}
							</div> */}
							</div>
						</div>
					</form>
				</div>
			</Container>
		</AppLayout>
	)
}

export default PropertyForm
