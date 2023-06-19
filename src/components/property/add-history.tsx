import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import {
	Controller,
	useForm,
	useFieldArray,
	UseFormRegister,
	Control,
	FieldErrors,
	UseFormSetValue
} from 'react-hook-form'

import * as yup from 'yup'
import { toast } from 'react-hot-toast'
import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { AddHistoryFormValues } from 'src/constants/form-defaults'
import { AddHistoryForm, CommissionForm, Property } from 'src/types/typings'
import { DateInput } from 'src/components/app/date'
import { useAppSelector } from 'src/hooks/rtk'
import clsx from 'clsx'
import { Radio } from 'src/components/app/radio'
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import FileUpload from 'src/components/app/file-upload'
import { Input, InputNumber } from 'src/components/app/input'
import propertyService from 'src/services/property'
import moment from 'moment'

interface AddHistoryFormProps {
	editData?: Property
	propertyId: string
}

function AddHistoryForm({ editData, propertyId }: AddHistoryFormProps) {
	const schema = yup.object<AddHistoryForm>().shape({
		CallDetails: yup.array().of(
			yup.object().shape({
				To: yup.string().notRequired(),
				Name: yup.string().notRequired(),
				Date: yup.string().notRequired(),
				From: yup.string().notRequired()
			})
		),
		AddPricingHistory: yup.array().of(
			yup.object().shape({
				price: yup.string().notRequired(),
				year: yup.string().notRequired()
			})
		),
		AddCommission: yup.object<CommissionForm>().shape({
			Amount: yup.number().notRequired(),
			AccountNumber: yup.number().notRequired(),
			Cheque: yup.number().notRequired(),
			Branch: yup.string().notRequired(),
			BankDetails: yup.string().notRequired()
		})
	})
	const {
		register,
		control,
		watch,
		reset,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<AddHistoryForm>({
		resolver: yupResolver(schema as any),
		defaultValues: {
			...AddHistoryFormValues(editData)
		},
		mode: 'all'
	})

	const { Roles } = useAppSelector(state => state.auth)
	const [historyImages, setHistoryImages] = useState<File[]>([])
	const [showCommission, setShowCommission] = useState(false)
	const [updating, setUpdating] = useState(false)

	const handleUpload = (files: File[]) => {
		if (historyImages) {
			setHistoryImages?.([...historyImages, ...files])
		}
		setValue?.('historyImages', [...files])
	}

	const handleHistoryDate = (value: string) => {
		setValue?.('Date', value)
	}

	const handleDate = (value: string) => {
		setValue?.('LeaseExpiringOn', value, { shouldValidate: true })
	}

	const occupancy = watch?.('OccupancyStatus')

	const addHistoryDetails = async (data: AddHistoryForm, images: FormData) => {
		const response = await propertyService.addPropertyHistory(data, editData ? editData._id : propertyId)
		console.log(response)

		if (response.success) {
			toast.success('Property history added successfully')
			const response = await propertyService.addPropertyHistoryImages(images, editData ? editData._id : propertyId)
			if (response.success) {
				toast.success('Property history images added successfully')
				setUpdating(false)
			} else {
				toast.error('Property history images not added')
				setUpdating(false)
			}
		} else {
			toast.error('Property history not added')
			setUpdating(false)
		}
	}

	const onFormSubmit = (data: AddHistoryForm) => {
		console.log("History",data)
		const historyImages = new FormData()
		if (data.historyImages) {
			data.historyImages.forEach(image => {
				historyImages.append(`imagePath`, image)
			})
		}
		setUpdating(true)
		addHistoryDetails(data, historyImages)
	}

	return (
		<div className="px-4 sm:px-4 lg:px-4">
			<form className="space-y-2 mb-3 sm:w-full w-full" onSubmit={handleSubmit(onFormSubmit)}>
				<div className="flex items-center justify-end text-base ">
					<div className="flex space-x-3">
						{showCommission && (
							<>
								<button
									type="button"
									onClick={() => {
										reset({
											AddCommission: {
												Amount: '',
												AccountNumber: '',
												Cheque: '',
												Branch: '',
												BankDetails: ''
											}
										})
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
							disabled={updating}
							className={clsx('bg-black px-6', showCommission && 'hidden')}>
							{updating ? (
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
				<div className={clsx('grid grid-cols-4 gap-x-8 gap-y-4')}>
					<div className={clsx('space-y-6', showCommission && 'hidden')}>
						<DateInput
							labelText="Date"
							type="date"
							value={editData?.AddHistory[0]?.Date}
							id="historydate"
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
									value={editData?.AddHistory[0]?.LeaseExpiringOn}
									onCalendarClick={handleDate}
									error={errors}
									labelText="Lease Expiring on"
									id="leaseexpiry"
									prevValue={moment(editData?.AddHistory[0].LeaseExpiringOn).format('DD MMM, YYYY')}
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
								name="historyImages"
								id="historyimage"
								placeholder="Select upto 10 files, File Type: jpg, png, gif, pdf"
							/>
							{Roles !== 'surveyor' && (
								<>
									<Controller
										name={'Calltype'}
										control={control}
										render={({ field: { onChange, value } }) => (
											<div className="flex space-x-6">
												<Radio
													labelText="Incoming Call Record"
													name="CallType"
													onChange={e => onChange(e.target.value)}
													value="IncomingCallRecord"
													checked={value === 'IncomingCallRecord'}
												/>
												<Radio
													labelText="Outgoing Call Record"
													name="CallType"
													onChange={e => onChange(e.target.value)}
													value="OutgoingCallRecord"
													checked={value === 'OutgoingCallRecord'}
												/>
											</div>
										)}
									/>
									<CallDetailsForm
										control={control}
										register={register}
										errors={errors}
										setValue={setValue}
										editData={editData}
									/>
									<PricingHistoryForm
										control={control}
										register={register}
										errors={errors}
										setValue={setValue}
										editData={editData}
									/>
								</>
							)}
						</div>
					</div>
					{Roles !== 'surveyor' && (
						<div className="col-span-4">
							<CommissionForm
								show={showCommission ?? false}
								register={register}
								control={control}
							/>
						</div>
					)}
				</div>
			</form>
		</div>
	)
}

interface FormProps {
	control?: Control<AddHistoryForm, any>
	register?: UseFormRegister<AddHistoryForm>
	errors?: FieldErrors<AddHistoryForm>
	setValue?: UseFormSetValue<AddHistoryForm>
}

const CommissionForm = ({ control, register, show }: FormProps & { show?: boolean }) => {
	return (
		<div className={clsx('grid grid-col-2 gap-x-8 gap-y-8', !show && 'hidden')}>
			<div className="space-y-6">
				<InputNumber
					id="commissionprice"
					labelText="Amount(Pkr)"
					register={register}
					autoComplete="commissionprice"
					name="AddCommission.Amount"
					currency={true}
					placeholder="Enter Price"
				/>
				<InputNumber
					id="accountnumber"
					labelText="Account Number"
					autoComplete="accountnumber"
					name="AddCommission.AccountNumber"
					register={register}
					placeholder="Enter account number"
				/>
			</div>
			<div className="space-y-6">
				<InputNumber
					id="chequenumber"
					labelText="Cheque #"
					register={register}
					autoComplete="chequenumber"
					name="AddCommission.Cheque"
					placeholder="Enter cheque number"
				/>
				<Input
					id="branch"
					autoComplete="branch"
					labelText="Branch"
					register={register}
					name="AddCommission.Branch"
					autoCapitalize="false"
					placeholder="Enter branch"
				/>
			</div>
			<div className="col-span-2">
				<Input
					id="bankdetails"
					autoComplete="bankdetails"
					labelText="Bank Details"
					register={register}
					name="AddCommission.BankDetails"
					autoCapitalize="false"
					placeholder="Enter bank details"
				/>
			</div>
		</div>
	)
}

const CallDetailsForm = ({ control, register, setValue, errors, editData }: FormProps & {editData?: Property}) => {
	const { fields, append, remove } = useFieldArray({ name: 'CallDetails', control })
	useEffect(() => {
		if (fields.length === 0) {
			append({ Date: '', From: '', Name: '', To: '' })
		}
	}, [fields])
	return (
		<div>
			{fields.map((child, index) => {
				const handleDate = (value: string) => {
					setValue?.(`CallDetails.${index}.Date`, value)
				}
				return (
					<div key={index} className="flex space-x-2 items-center">
						<DateInput
							id="date"
							placeholder="Date"
							autoComplete="date"
							name={`CallDetails.${index}.Date`}
							prevValue={moment(editData?.AddHistory[0].CallDetails?.[index].Date).format('DD MMM, YYYY')}
							required={true}
							autoCapitalize="false"
							onCalendarClick={handleDate}
						/>
						<label htmlFor="phone">From: </label>
						<InputNumber
							id="phone"
							autoComplete="phone"
							name={`CallDetails.${[index]}.From`}
							register={register}
							error={errors}
							required={true}
							maxLength={12}
							placeholder="123987654321"
						/>
						<Input
							id="callername"
							autoComplete="callername"
							register={register}
							name={`CallDetails.${index}.Name`}
							error={errors}
							required={true}
							autoCapitalize="false"
							placeholder="Caller Name"
						/>
						<label htmlFor="phone">To: </label>
						<InputNumber
							id="phone"
							autoComplete="phone"
							register={register}
							name={`CallDetails.${index}.To`}
							error={errors}
							maxLength={12}
							required={true}
							placeholder="923007654321"
						/>
						{index === 0 ? (
							<button
								type="button"
								onClick={() => append({ Date: '', From: '', Name: '', To: '' as any })}
								className="bg-[#0038FF] rounded-md p-2 text-white mt-1">
								<PlusIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
							</button>
						) : (
							<button
								type="button"
								onClick={() => remove(index)}
								className="bg-[#717B9D] rounded-md p-2 text-white mt-1">
								<XMarkIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
							</button>
						)}
					</div>
				)
			})}
		</div>
	)
}

const PricingHistoryForm = ({ control, register, setValue, errors, editData }: FormProps & {editData?: Property}) => {
	const { fields, append, remove } = useFieldArray({ name: 'AddPricingHistory', control })
	useEffect(() => {
		if (fields.length === 0) {
			append({ price: '', year: '' as any })
		}
	}, [fields])
	return (
		<div>
			{fields.map((child, index) => {
				const handleDate = (value: string) => {
					setValue?.(`AddPricingHistory.${index}.year`, value)
				}
				return (
					<div key={index} className="flex space-x-2 items-center">
						<label htmlFor="price">Price(Pkr) </label>
						<InputNumber
							id="price"
							autoComplete="price"
							register={register}
							name={`AddPricingHistory.${index}.price`}
							error={errors}
							required={true}
							placeholder="0"
							currency={true}
						/>
						<label htmlFor="date" className="whitespace-nowrap">
							In Year
						</label>
						<DateInput
							id="date"
							year={true}
							placeholder="Year"
							autoComplete="date"
							register={register}
							prevValue={editData?.AddHistory[0].AddPricingHistory?.[index].year}
							onCalendarClick={handleDate}
							name={`AddPricingHistory.${index}.year`}
							required={true}
							autoCapitalize="false"
						/>
						{index === 0 ? (
							<button
								type="button"
								onClick={() => append({ price: '', year: '' as any })}
								className="bg-[#0038FF] rounded-md p-2 text-white mt-1">
								<PlusIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
							</button>
						) : (
							<button
								type="button"
								onClick={() => remove(index)}
								className="bg-[#717B9D] rounded-md p-2 text-white mt-1">
								<XMarkIcon className="h-7 w-7 stroke-white" aria-hidden="true" />
							</button>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default AddHistoryForm
