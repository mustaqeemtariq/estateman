import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { Input, InputNumber } from 'src/components/app/input'
import { ShowHidePassword } from 'src/components/password'
import { UserRightTypes } from 'src/constants/constants'
import { UserForm } from 'src/types/typings'
import { Checkbox } from '../app/checkbox'

const schema = yup.object<UserForm>().shape({
	username: yup.string().required('Name is required'),
	email: yup.string().email('Email must be a valid email address').required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters long')
		.matches(
			/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
			'Password must contain one uppercase letter, one number, and one special character'
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Confirm password is required'),
	phone: yup
		.string()
		.required('Contact number is a required field')
		.min(11, 'Phone number should be 11 digits')
		.max(11, 'Phone number should be 11 digits'),
	cnic: yup
		.string()
		.required('CNIC is a required field')
		.min(13, 'CNIC should be 13 digits')
		.max(13, 'CNIC should be 13 digits'),
	address: yup.string().required('Address is a required field'),
	rights: yup
		.array()
		.min(1, 'Please select at least one user right')
		.required('Please select at least one user right')
})

interface UserFormProps {
	isNew: boolean
	title: string
	userId?: string | string[]
}

const UserForm = ({ isNew, title, userId }: UserFormProps) => {
	const [isUpdating, setUpdating] = useState(false)
	const [togglePassword, setTogglePassword] = useState(false)
	const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false)

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<UserForm>({
		resolver: yupResolver(schema),
		mode: 'all'
	})

	const handleFormSubmit = (data: any) => {
		setUpdating(true)
	}

	const [selectedRights, setSelectedRights] = useState<UserRightTypes[]>([])

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target
		if (checked) {
			setSelectedRights([...selectedRights, value as UserRightTypes])
		} else {
			setSelectedRights(selectedRights.filter(right => right !== value))
		}
	}

	return (
		<div className="px-4 sm:px-4 lg:px-4">
			<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2 mb-3 sm:w-full w-full">
				<div className="flex items-center justify-between text-base ">
					<div className="sm:flex-auto ml-2">
						{isNew && (
							<h1 className="font-semibold leading-6 text-[#0038FF] text-xl uppercase">{title}</h1>
						)}
						{!isNew && (
							<div className="flex items-center">
								<h2 className="text-md flex items-center uppercase text-gray-900">
									<Link href={'/user/list'}>All Users</Link>
									<ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
								</h2>
								<h1 className="font-semibold leading-6 text-[#0038FF] text-xl uppercase">
									{title}
								</h1>
							</div>
						)}
					</div>
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
							labelText="Username"
							id="username"
							autoComplete="username"
							register={register}
							name="username"
							error={errors}
							required={true}
							autoCapitalize="false"
							placeholder="Enter Username"
						/>

						<Input
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
					</div>
					<div className="col-span-full">
						<label htmlFor="address" className="block text-[#0D0C18]">
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
						<div className="flex justify-between items-center max-sm:flex-col">
							<label htmlFor="rights" className="block text-[#0D0C18]">
								User Rights
								<span style={{ color: 'red' }}> *</span>
							</label>
							<Controller
								name="rights"
								control={control}
								render={({ field: { onChange, value } }) => {
									return (
										<div className="flex space-x-32 flex-wrap">
											<Checkbox
												labelText="Add Property"
												name="add"
												onChange={handleCheckboxChange}
												value={UserRightTypes.ADD}
												checked={selectedRights.includes(UserRightTypes.ADD)}
											/>
											<Checkbox
												labelText="Edit Property"
												name="edit"
												onChange={handleCheckboxChange}
												value={UserRightTypes.EDIT}
												checked={selectedRights.includes(UserRightTypes.EDIT)}
											/>
											<Checkbox
												labelText="View Property"
												name="view"
												onChange={handleCheckboxChange}
												value={UserRightTypes.VIEW}
												checked={selectedRights.includes(UserRightTypes.VIEW)}
											/>
										</div>
									)
								}}
							/>
						</div>
						{errors.rights && <p className="text-xs text-red-600">{errors.rights?.message}</p>}
					</div>
				</div>
			</form>
		</div>
	)
}

export default UserForm
