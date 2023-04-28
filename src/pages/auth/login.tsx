import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Logo from 'src/assets/logo/em-logo.png'
import { Spinner } from 'src/components/animations/spinner'
import { Button } from 'src/components/app/button'
import { Checkbox, Input } from 'src/components/app/input'
import { AppLayout } from 'src/components/app/layout'
import { ShowHidePassword } from 'src/components/password'
import * as yup from 'yup'

const schema = yup.object().shape({
    username: yup.string().required('Username is missing'),
    password: yup.string().required('Password is missing')
})

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const [isLoading, setLoading] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false)

    const handleFormSubmit = (data: any) => {
        const { username, password } = data
        setLoading(true)
    }

    return (
        <AppLayout title="Login" renderHeader={false}>
            <div className='flex flex-col justify-center items-center py-12'>
                <div className="space-y-1 sm:mx-auto sm:w-full sm:max-w-md">
                    <Image className='mx-auto' src={Logo} alt="logo" />
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
                        <Input
                            autoComplete="true"
                            register={register}
                            name="username"
                            placeholder="Enter your username"
                            errors={errors}
                            labelText="Username"
                        />
                        <div className='relative h-[70px]'>
                            <Input
                                name="password"
                                labelText="Password"
                                register={register}
                                errors={errors}
                                placeholder="Enter your password"
                                type={togglePassword ? 'text' : 'password'}
                                autoCapitalize="false"
                            />
                            <div
                                onClick={() => setTogglePassword(!togglePassword)}
                                className='absolute inset-y-0 flex cursor-pointer items-center right-2 top-6'>
                                {<ShowHidePassword open={togglePassword} />}
                            </div>
                        </div>


                        <Checkbox
                            name="remember"
                            labelText='Remember Me'
                        />


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
                                    <span className='uppercase'>Login</span>
                                )}
                            </Button>
                        </div>
                        <div className='flex justify-between'>
                            <span>Forgot Password</span>
                            <span>Surveyor Login</span>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}

export default Login