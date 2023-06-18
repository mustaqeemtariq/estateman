import React, { Dispatch, SetStateAction, useState } from 'react'
import { PropertyDetailsFormValues } from 'src/constants/form-defaults'
import { OwnerDetails, Property, PropertyDetailsForm } from 'src/types/typings'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../app/button'
import { Spinner } from '../animations/spinner'
import { Select } from '../app/select'
import { CityNames } from 'src/constants/constants'
import { Input, InputNumber } from '../app/input'
import FileUpload from '../app/file-upload'
import propertyService from 'src/services/property'
import { toast } from 'react-hot-toast'

interface PropertyDetailsFormProps {
	setCurrentTab: Dispatch<SetStateAction<string>>
	editData?: Property
	propertyId?: string
	category: string
}

const PropertyDetailsForm = ({
	setCurrentTab,
	category,
	propertyId,
	editData
}: PropertyDetailsFormProps) => {
	const schema = yup.object<PropertyDetailsForm>().shape({
		City: yup.string().required('City is required'),
		Housenumber: yup.string().required(`${category} number is required`),
		Gas: yup.string().test('gasType', 'Gas is required', function (value) {
			if (!value) return false
			if (value.toLowerCase() === 'yes' || value.toLocaleLowerCase() === 'no') return true

			throw this.createError({
				message: 'Gas must be either "yes" or "no" or empty',
				path: 'Gas'
			})
		}),
		Electricity: yup.string().test('electricityType', 'Electricity is required', function (value) {
			if (!value) return false
			if (value.toLowerCase() === 'yes' || value.toLocaleLowerCase() === 'no') return true

			throw this.createError({
				message: 'Electricity must be either "yes" or "no" or empty',
				path: 'Electricity'
			})
		}),
		OwnerDetails: yup.object<OwnerDetails>().shape({
			Name: yup.string().required('Name is required'),
			Address: yup.string().required('Address is required'),
			ContactNumber: yup
				.string()
				.required('Contact number is a required field')
				.min(11, 'Phone number should be 11 digits')
				.max(11, 'Phone number should be 11 digits'),
			CNIC: yup
				.string()
				.required('CNIC is a required field')
				.min(13, 'CNIC should be 13 digits')
				.max(13, 'CNIC should be 13 digits'),
			Ligitation: yup.string().notRequired(),
			AlternateNumber: yup
				.string()
				.notRequired()
				.min(11, 'Phone number should be 11 digits')
				.max(11, 'Phone number should be 11 digits'),
			OwnerDescription: yup.string().notRequired()
		})
	})

	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<PropertyDetailsForm>({
		resolver: yupResolver(schema as any),
		defaultValues: {
			...PropertyDetailsFormValues(editData)
		},
		mode: 'all'
	})

	const [updating, setUpdating] = useState(false)
	const [propertyImages, setPropertyImages] = useState<File[]>([])

	const addPropertyDetails = async (data: PropertyDetailsForm, images: FormData) => {
		const response = await propertyService.addPropertyDetails(data, propertyId ?? '')
		console.log(response)

		if (response.success) {
			toast.success('Property details added successfully')
			const response = await propertyService.addPropertyDetailsImages(images, propertyId ?? '')
			if (response.success) {
				toast.success('Property details images added successfully')
				setUpdating(false)
				setCurrentTab('Add History')
			} else {
				toast.error('Property details images not added')
				setUpdating(false)
			}
		} else {
			toast.error('Property details not added')
			setUpdating(false)
		}
	}

	const onFormSubmit = (data: PropertyDetailsForm) => {
		const propertyImages = new FormData()
		if (data.propertyImages) {
			data.propertyImages.forEach(image => {
				propertyImages.append(`imagePath`, image)
			})
		}
		setUpdating(true)
		addPropertyDetails(data, propertyImages)
	}

	const handleUpload = (files: File[]) => {
		if (propertyImages) {
			setPropertyImages?.([...propertyImages, ...files])
		}
		setValue?.('propertyImages', [...files])
	}

	return (
		<div className="px-4 sm:px-4 lg:px-4">
			<form className="space-y-2 mb-3 sm:w-full w-full" onSubmit={handleSubmit(onFormSubmit)}>
				<div className="flex items-center justify-end text-base ">
					<div className="flex space-x-3">
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
									{editData?.PropertyDetails?.City && (
										<option value={editData?.PropertyDetails?.City}>
											{editData?.PropertyDetails?.City}
										</option>
									)}
									<option value="">Select a City</option>
									{Object.values(CityNames).map(unit => (
										<option key={unit} value={unit}>
											{unit}
										</option>
									))}
								</Select>

								<div className="flex space-x-8">
									<InputNumber
										id="house"
										labelText={`${category} number`}
										autoComplete="house"
										name="Housenumber"
										error={errors}
										required={true}
										placeholder={`Enter ${category} number`}
										register={register}
									/>

									<InputNumber
										id="street"
										labelText="Street#"
										autoComplete="street"
										name="Streetno"
										error={errors}
										placeholder="Enter Street Number"
										register={register}
									/>
								</div>
								<div className="space-y-2">
									<FileUpload
										onUpload={handleUpload}
										setData={setPropertyImages}
										name="sentPropertyImages"
										labelText="Upload Images"
										error={errors}
										placeholder="Upload image file"
									/>
									<span className="text-sm">
										Select up to 10 images, File type: jpg, png, gif, pdf
									</span>
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
									<InputNumber
										id="bed"
										labelText="Bed"
										autoComplete="bed"
										name="Bed"
										error={errors}
										register={register}
										maxLength={2}
									/>

									<InputNumber
										id="bath"
										labelText="Bath"
										autoComplete="bath"
										name="Bath"
										error={errors}
										register={register}
										maxLength={2}
									/>

									<InputNumber
										id="kitchen"
										labelText="Kitchen"
										autoComplete="kitchen"
										name="Kitchen"
										error={errors}
										register={register}
										maxLength={2}
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
							<div>
								<Input
									labelText="Name"
									id="name"
									autoComplete="name"
									register={register}
									name="OwnerDetails.Name"
									error={errors}
									required={true}
									autoCapitalize="false"
									placeholder="Enter Name"
								/>
								{errors.OwnerDetails?.Name && (
									<p className="text-xs text-red-600">{errors.OwnerDetails.Name.message}</p>
								)}
							</div>
							<div>
								<Input
									labelText="Address"
									id="address"
									autoComplete="address"
									register={register}
									name="OwnerDetails.Address"
									error={errors}
									required={true}
									autoCapitalize="false"
									placeholder="Enter Address"
								/>
								{errors.OwnerDetails?.Address && (
									<p className="text-xs text-red-600">{errors.OwnerDetails.Address.message}</p>
								)}
							</div>

							<div>
								<InputNumber
									labelText="CNIC"
									id="cnic"
									autoComplete="cnic"
									name="OwnerDetails.CNIC"
									register={register}
									error={errors}
									required={true}
									maxLength={13}
									autoCapitalize="false"
									placeholder="Enter CNIC"
								/>
								{errors.OwnerDetails?.CNIC && (
									<p className="text-xs text-red-600">{errors.OwnerDetails.CNIC.message}</p>
								)}
							</div>

							<label htmlFor="ligitation" className="block text-[#0D0C18]">
								Ligitation (If Any)
							</label>

							<Controller
								name="OwnerDetails.Ligitation"
								control={control}
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<>
										<textarea
											id="ligitation"
											name="OwnerDetails.Ligitation"
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
							<div>
								<InputNumber
									labelText="Contact Number"
									id="phone"
									name="OwnerDetails.ContactNumber"
									register={register}
									autoComplete="phone"
									error={errors}
									required={true}
									maxLength={11}
									autoCapitalize="false"
									placeholder="Enter Contact Number"
								/>
								{errors.OwnerDetails?.ContactNumber && (
									<p className="text-xs text-red-600">
										{errors.OwnerDetails.ContactNumber.message}
									</p>
								)}
							</div>
							<div>
							<InputNumber
								labelText="Alternate Number"
								id="alternatephone"
								register={register}
								autoComplete="alternatephone"
								name="OwnerDetails.AlternateNumber"
								error={errors}
								maxLength={11}
								autoCapitalize="false"
								placeholder="Enter Alternate Number"
							/>
							{errors.OwnerDetails?.AlternateNumber && (
									<p className="text-xs text-red-600">
										{errors.OwnerDetails.AlternateNumber.message}
									</p>
							)}
							</div>
							<label htmlFor="description" className="block text-[#0D0C18]">
								Property / Owner Description
							</label>

							<Controller
								name="OwnerDetails.OwnerDescription"
								control={control}
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<>
										<textarea
											id="description"
											name="OwnerDescription.OwnerDescription"
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
			</form>
		</div>
	)
}
export default PropertyDetailsForm
