import {
	Control,
	Controller,
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'
import { CommissionForm, Property } from 'src/types/typings'
import { Input, InputNumber } from '../app/input'

import clsx from 'clsx'
import * as yup from 'yup'

interface CommissionProps {
	show: boolean
	register?: UseFormRegister<Property>
	errors?: FieldErrors<Property>
	control?: Control<Property, any>
	setValue?: UseFormSetValue<Property>
	watch?: UseFormWatch<Property>
}

const Commission = ({ show, control, register, errors }: CommissionProps) => {
	const schema = yup.object<CommissionForm>().shape({})

	return (
		<div className={clsx('grid grid-col-2 gap-x-8 gap-y-8', !show && 'hidden')}>
			<div className="space-y-6">
				<Controller
					name={'Amount'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputNumber
							id="commissionprice"
							labelText="Amount(Pkr)"
							autoComplete="commissionprice"
							name="Amount"
							error={errors}
							currency={true}
							placeholder="Enter Price"
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<Controller
					name={'AccountNumber'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputNumber
							id="accountnumber"
							labelText="Account Number"
							autoComplete="accountnumber"
							name="AccountNumber"
							error={errors}
							placeholder="Enter account number"
							onChange={onChange}
							value={value}
						/>
					)}
				/>
			</div>
			<div className="space-y-6">
				<Controller
					name={'Cheque'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputNumber
							id="chequenumber"
							labelText="Cheque #"
							autoComplete="chequenumber"
							name="Cheque"
							error={errors}
							placeholder="Enter cheque number"
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<Input
					id="branch"
					autoComplete="branch"
					labelText="Branch"
					register={register}
					name="Branch"
					error={errors}
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
					name="BankDetails"
					error={errors}
					autoCapitalize="false"
					placeholder="Enter bank details"
				/>
			</div>
		</div>
	)
}

export default Commission
