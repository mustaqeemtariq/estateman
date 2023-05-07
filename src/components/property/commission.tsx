import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { CommissionForm } from 'src/types/typings'
import { Input, InputNumber } from '../app/input'

import clsx from 'clsx'
import * as yup from 'yup'

interface CommissionProps {
	show: boolean
}

const Commission = ({ show }: CommissionProps) => {
	const schema = yup.object<CommissionForm>().shape({})

	const {
		register,
		control,
		formState: { errors }
	} = useForm<CommissionForm>({
		resolver: yupResolver(schema),
		mode: 'all'
	})

	return (
		<div className={clsx('grid grid-col-2 gap-x-8 gap-y-8', !show && 'hidden')}>
			<div className="space-y-6">
				<Controller
					name={'commissionprice'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputNumber
							id="commissionprice"
							labelText="Amount(Pkr)"
							autoComplete="commissionprice"
							name="commissionprice"
							error={errors}
							currency={true}
							placeholder="Enter Price"
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<Controller
					name={'accountnumber'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputNumber
							id="accountnumber"
							labelText="Account Number"
							autoComplete="accountnumber"
							name="accountnumber"
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
					name={'chequenumber'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputNumber
							id="chequenumber"
							labelText="Cheque #"
							autoComplete="chequenumber"
							name="chequenumber"
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
					name="branch"
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
					name="bankdetails"
					error={errors}
					autoCapitalize="false"
					placeholder="Enter bank details"
				/>
			</div>
		</div>
	)
}

export default Commission
