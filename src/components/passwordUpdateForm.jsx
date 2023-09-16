import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function passwordUpdateForm({ socialLogin }) {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();
    const [status, setStatus] = useState()
    const updatePassword = async (formData) => {
        const response = await axios.post('/api/profile/updatepassword', formData)
        setStatus(response.data);
    }
    return <>
        <form className="space-y-4" onSubmit={handleSubmit(updatePassword)}>
            {socialLogin && <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">use your social account setting to change your password</div>}
            {status && <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">{status.msg}</div>}

            <div>
                <label htmlFor="current_password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
                <input  {...register("current_password", { required: true, minLength: 8 })} type="password" id="current_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled={socialLogin} />
                {errors.current_password && <small className='text-red-500'>password must be 8 characters</small>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">New password</label>
                <input {...register("password", { required: true, minLength: 8 })} type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled={socialLogin} />
                {errors.password && <small className='text-red-500'>password must be 8 characters</small>}
            </div>
            <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input {...register("confirm_password", { required: true, minLength: 8, validate: value => value == watch('password') })} type="password" id="confirm_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled={socialLogin} />
                {errors.confirm_password && <small className='text-red-500'>password must matched</small>}
            </div>

            <button type="submit" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={socialLogin}>Update</button>
        </form>
    </>
}
