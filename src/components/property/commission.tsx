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
					name={'AddCommission.Amount'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputNumber
							id="commissionprice"
							labelText="Amount(Pkr)"
							autoComplete="commissionprice"
							name="AddCommission.Amount"
							error={errors}
							currency={true}
							placeholder="Enter Price"
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<Controller
					name={'AddCommission.AccountNumber'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputNumber
							id="accountnumber"
							labelText="Account Number"
							autoComplete="accountnumber"
							name="AddCommission.AccountNumber"
							error={errors}
							currency={true}
							placeholder="Enter account number"
							onChange={onChange}
							value={value}
						/>
					)}
				/>
			</div>
			<div className="space-y-6">
				<Controller
					name={'AddCommission.Cheque'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputNumber
							id="chequenumber"
							labelText="Cheque #"
							autoComplete="chequenumber"
							name="AddCommission.Cheque"
							error={errors}
							currency={true}
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
					name="AddCommission.Branch"
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
					name="AddCommission.BankDetails"
					error={errors}
					autoCapitalize="false"
					placeholder="Enter bank details"
				/>
			</div>
		</div>
	)
}

export default Commission
