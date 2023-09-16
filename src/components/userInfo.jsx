'use client'
import { useState } from 'react';
import { Pen } from './icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';
export default function ({ name, email }) {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [isEditing, setIsEditing] = useState();

    const changeName = async (formData) => {
        try {
            const response = await axios.post('/api/profile/updateinfo', formData)
            if (response.status == 200) {
                reloadSession()
            }
            toggleEditing()
        } catch (error) {
            alert("something went wrong")
        }
    }
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };
    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };

    return (
        <div className='info'>
            {name ? (

                <>
                    {isEditing ?
                        <form onSubmit={handleSubmit(changeName)}>
                            <input {...register("name", { required: true, minLength: 3 })} type="text" className="p-2 me-2 text-xs border border-gray-300 rounded outline-none focus:ring-0" defaultValue={name} />
                            <button className="px-3 py-2 text-xs font-medium text-center text-white bg-primary-500 rounded-lg hover:bg-secondary-500" >Save</button>
                            {errors.name && <small className='block text-red-500'>min 3 characters required</small>}
                        </form>

                        :
                        <h2 className='font-semibold text-slate-600 capitalize'>
                            {name}{' '}
                            <div className='icon inline' onClick={toggleEditing}>
                                <Pen />
                            </div>
                        </h2>}
                    <small className='text-slate-600'>{email}</small>
                </>
            ) : (
                <div role="skeleton" className="max-w-sm animate-pulse">
                    <div className="h-4 bg-gray-200 w-48 mb-4" />
                    <div className="h-2.5 bg-gray-200 w-40 mb-4" />
                </div>
            )}
        </div>
    );
}

