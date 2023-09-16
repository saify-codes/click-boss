'use client'
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { Facebook, Google } from '@/components/icons'

export default function page() {

    const router = useRouter()
    const session = useSession()
    const [error, setError] = useState(false)
    const { register, handleSubmit, formState: { errors }, } = useForm();


    const login = async (formData) => {
        const { error } = await signIn('credentials', { redirect: false, ...formData })
        if (error) setError(true)

    }

    const googleLogin = async () => {
        const data = await signIn('google')
    }

    useLayoutEffect(() => {
        if (session.status === 'authenticated')
            switch (session.data.role) {
                case 'ADMIN':
                    router.push('/admin')
                    break;
                case 'USER':
                    router.push('/')
                    break;
            }
    }, [session.status])
    return <>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Click Boss
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"><span className="font-medium">Invalid</span> username or password</div>}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(login)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc@gmail.com" />
                                {errors.email?.type === 'required' && <small className='text-red-500'>email is required</small>}
                                {errors.email?.type === 'pattern' && <small className='text-red-500'>email is invalid</small>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input {...register("password", { required: true, minLength: 8 })} type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {errors.password && <small className='text-red-500'>password must be 8 characters</small>}
                            </div>

                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <button type="button" onClick={googleLogin} className="w-full border bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center gap-2"><Google />Google</button>
                            <button type="button" className="w-full border bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center gap-2"><Facebook /> Facebook </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    </>
}
