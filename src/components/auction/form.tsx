import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { Input, InputNumber } from 'src/components/app/input'
import { CityNames, UnitTypes } from 'src/constants/constants'
import { Auction } from 'src/types/typings'
import { DateInput } from '../app/date'
import FileUpload from '../app/file-upload'
import { Radio } from '../app/radio'
import { Select } from '../app/select'
import auctionService from 'src/services/auction'
import { toast } from 'react-hot-toast'

const schema = yup.object<Auction>().shape({
	Title: yup.string().required('Title is required e.g Furnished 2 Bed F 11'),
	Auctioneer: yup.string().required('Please select at least one option'),
	ContactPerson: yup.string().required('Name is required'),
	Location: yup.string().required('Location is required'),
	LandArea: yup.string().required('Area is required'),
	Units: yup.string().required('Select a unit'),
	ReservePrice: yup.string().required('Price is required'),
	PlaceofAuction: yup.string().required('Place Of Auction is required'),
	City: yup
		.string()
		.min(1, 'Please select at least one city')
		.required('Please select at least one city'),
	ContactNumber: yup
		.string()
		.required('Contact number is a required field')
		.min(11, 'Phone number should be 11 digits')
		.max(11, 'Phone number should be 11 digits')
})

const AuctionForm = () => {
	const [isUpdating, setUpdating] = useState(false)

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<Auction>({
		resolver: yupResolver(schema),
		mode: 'all'
	})

	const postData = async (data: Auction) => {
		const response = await auctionService.addAuction(data)
		if (response.success) {
			toast.success('Auction addded successfully')
		}
		else {
			toast.error('Something went wrong')
			setUpdating(false)
		}
	}

	const handleFormSubmit = (data: Auction) => {
		postData(data)
		
		setUpdating(true)
	}

	const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

	const handleUpload = (files: File[]) => {
		setUploadedFiles([...uploadedFiles, ...files])
	}

	return (
		<div className="px-4 sm:px-4 lg:px-4">
			<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2 mb-3 sm:w-full w-full">
				<div className="flex items-center justify-end mt-2 text-base ">
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
				<div className="space-y-4">
					<div className="flex sm:space-x-8 max-sm:flex-col">
						<Input
							className="w-1/2"
							labelText="Title"
							id="title"
							autoComplete="title"
							register={register}
							name="Title"
							error={errors}
							required={true}
							autoCapitalize="false"
							placeholder="Enter Title"
						/>
						<div className="flex flex-col w-full">
							<Controller
								name={'Auctioneer'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col w-full space-y-4">
										<label htmlFor="Auctioneer">Auctioneer</label>
										<div className="flex flex-row items-center gap-x-14">
											<Radio
												labelText="Bank"
												name="Bank"
												onChange={e => onChange(e.target.value)}
												value="bank"
												checked={value === 'bank'}
											/>
											<Radio
												labelText="Government"
												name="Government"
												onChange={e => onChange(e.target.value)}
												value="government"
												checked={value === 'government'}
											/>
										</div>
									</div>
								)}
							/>
							{errors && <p className="text-xs text-red-600">{errors.Auctioneer?.message}</p>}
						</div>
					</div>

					<div className="flex sm:space-x-8 max-sm:flex-col">
						<div className="flex space-x-2 w-full">
							<Select
								id="city"
								labelText="City"
								autoComplete="city"
								register={register}
								name="City"
								errors={errors}
								required={true}
								className="bg-[#E8E8E8]"
								autoCapitalize="false">
								<option value="">Select a City</option>
								{Object.values(CityNames).map(city => (
									<option key={city} value={city}>
										{city}
									</option>
								))}
							</Select>
							<Select
								id="society"
								labelText="Society"
								autoComplete="society"
								register={register}
								name="Society"
								errors={errors}
								required={true}
								className="bg-[#E8E8E8]"
								autoCapitalize="false">
								<option value="">Select a Society</option>
								{Object.values(UnitTypes).map(unit => (
									<option key={unit} value={unit}>
										{unit}
									</option>
								))}
							</Select>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="date" className="whitespace-nowrap">
								Auction Date & Time
							</label>
							<DateInput
								type="date"
								id="date"
								placeholder="Date"
								autoComplete="date"
								register={register}
								name="AuctionDateandTime"
								error={errors}
								required={true}
								autoCapitalize="false"
							/>
						</div>
					</div>

					<div className="flex sm:space-x-8 max-sm:flex-col">
						<Input
							labelText="Location or Nearby Place"
							id="location"
							autoComplete="location"
							register={register}
							name="Location"
							error={errors}
							required={true}
							autoCapitalize="false"
							placeholder="Enter Location Or Nearby Place"
						/>

						<div className="flex w-full space-x-2 justify-between">
							<div className="flex flex-col w-full">
								<label htmlFor="balance">Balance(Pkr) </label>
								<Controller
									name={'Balance'}
									control={control}
									render={({ field: { onChange, value } }) => (
										<InputNumber
											id="balance"
											autoComplete="balance"
											name="Balance"
											error={errors}
											required={true}
											placeholder="0"
											onChange={onChange}
											value={value}
											currency={true}
										/>
									)}
								/>
							</div>
							<div className="flex flex-col w-full">
								<label htmlFor="reservedPrice">Reserve Price(Pkr) </label>
								<Controller
									name={'ReservePrice'}
									control={control}
									render={({ field: { onChange, value } }) => (
										<InputNumber
											id="reservedPrice"
											autoComplete="reservedPrice"
											name="reservedPrice"
											error={errors}
											required={true}
											placeholder="0"
											onChange={onChange}
											value={value}
											currency={true}
										/>
									)}
								/>
							</div>
						</div>
					</div>
					<div className="flex sm:space-x-8 max-sm:flex-col">
						<div className="flex space-x-2 w-full">
							<div className="flex flex-col w-full">
								<label htmlFor="balance">Area</label>
								<Controller
									name={'LandArea'}
									control={control}
									render={({ field: { onChange, value } }) => (
										<InputNumber
											id="area"
											autoComplete="area"
											name="area"
											error={errors}
											required={true}
											placeholder="0"
											onChange={onChange}
											value={value}
										/>
									)}
								/>
							</div>
							<Select
								id="unit"
								labelText="Unit"
								autoComplete="unit"
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
						<div className="flex space-x-2 w-full">
							<Input
								labelText="Username"
								id="username"
								autoComplete="username"
								register={register}
								name="ContactPerson"
								error={errors}
								required={true}
								autoCapitalize="false"
								placeholder="Enter Username"
							/>

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
						</div>
					</div>
					<div className="flex sm:space-x-8 max-sm:flex-col">
						<Input
							labelText="Place of Auction"
							id="placeOfAuction"
							autoComplete="placeOfAuction"
							register={register}
							name="PlaceofAuction"
							error={errors}
							required={true}
							autoCapitalize="false"
							placeholder="Enter On site Or place name"
						/>
						<FileUpload
							onUpload={handleUpload}
							labelText="Upload Images"
							name="images"
							id="images"
							placeholder="Select upto 10 files, File Type: jpg, png, gif, pdf"
						/>
					</div>
				</div>
			</form>
		</div>
	)
}

export default AuctionForm
