import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import background from 'src/assets/login/bg.png'
import Logo from 'src/assets/logo/em-logo.png'
import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { Checkbox } from 'src/components/app/checkbox'
import { Input } from 'src/components/app/input'
import { AppLayout } from 'src/components/app/layout'
import { ShowHidePassword } from 'src/components/password'
import { useAppDispatch } from 'src/hooks/rtk'
import authService from 'src/services/auth'
import { login } from 'src/slices/auth'
import { User } from 'src/types/typings'
import * as yup from 'yup'

const schema = yup.object().shape({
	Username: yup.string().required('Please enter valid username'),
	Password: yup.string().required('Please enter valid password')
})

const Login = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema as any),
		defaultValues: {
			Username: '',
			Password: '',
			RememberMe: ''
		},
		mode: 'all'
	})

	const router = useRouter()
	const [isLoading, setLoading] = useState(false)
	const [togglePassword, setTogglePassword] = useState(false)
	const [Roles, setRole] = useState('admin')
	const dispatch = useAppDispatch()

	const loginUser = async (user: User) => {
		dispatch(login(user))
			.then(() => {
				toast.success('Successfully Login')
			})
			.catch(error => toast.error('Login Failed'))
			.finally(() => setLoading(false))
	}

	const handleFormSubmit = (data: any) => {
		loginUser({ ...data, Roles })
		setLoading(true)
	}

	const handleForgetPassword = async () => {
		authService.forgotPassword('admin')
	}

	const handleRoleChange = () => {
		if (Roles === 'admin') setRole('surveyor')
		else setRole('admin')
	}

	const bgImage = `url(${background.src})`

	return (
		<AppLayout renderSidebar={false}>
			<div
				style={{ backgroundImage: bgImage }}
				className="flex flex-col justify-center items-center py-12 bg-cover bg-center h-screen">
				<div className="space-y-1 sm:mx-auto sm:w-full sm:max-w-md">
					<Image className="mx-auto" src={Logo} alt="logo" />
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
						<Input
							autoComplete="true"
							register={register}
							name="Username"
							placeholder="Enter your username"
							error={errors}
							labelText="Username"
						/>
						<div className="relative h-[70px]">
							<Input
								name="Password"
								labelText="Password"
								register={register}
								error={errors}
								placeholder="Enter your password"
								type={togglePassword ? 'text' : 'password'}
								autoCapitalize="false"
							/>
							<div
								onClick={() => setTogglePassword(!togglePassword)}
								className="absolute inset-y-0 flex cursor-pointer items-center right-2 top-7">
								{<ShowHidePassword open={togglePassword} />}
							</div>
						</div>

						<div className="flex items-center">
							<Controller
								name="RememberMe"
								control={control}
								render={({ field: { onChange, value } }) => (
									<Checkbox
										labelText="Remember Me"
										name="remember"
										onChange={onChange}
										value={value}
									/>
								)}
							/>
						</div>

						<div className="space-y-3">
							<Button
								className="bg-[#0038FF] hover:bg-indigo-700 focus:ring-indigo-500"
								type="submit"
								disabled={isLoading}>
								{isLoading ? (
									<>
										<Spinner />
										<span className={'mx-auto animate-pulse'}>Please wait...</span>
									</>
								) : (
									<span className="uppercase">Login</span>
								)}
							</Button>
						</div>
						<div className="flex justify-between">
							<span className="cursor-pointer" onClick={handleForgetPassword}>
								Forgot Password
							</span>
							<span className="cursor-pointer" onClick={handleRoleChange}>
								{Roles === 'admin' ? 'Surveyor Login' : 'Admin Login'}
							</span>
						</div>
					</form>
				</div>
			</div>
		</AppLayout>
	)
}

export default Login
