'use client'
import MainLayout from '@/layouts/main'
import User from '@/components/user'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function page() {
    const [users, setUsers] = useState([])
    const deleteUSer = (id) => {
        console.log('Deleting user with id:', id);

        const newUsers = users.filter(user => user.id !== id);
        console.log('New user array:', newUsers);

        setUsers(newUsers);
    }


    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users')
            const users = response.data
            console.log(users);
            setUsers(users)
        } catch (error) {
            alert('something went wrong')
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return <>
        <MainLayout>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Account
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? <tr><th>loading...</th></tr> : users.map(user => <User name={user.name} email={user.email} img={user.image} del={() => { deleteUSer(user.id) }} id={user.id} key={user.id} />)}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    </>
}


function Loader(){
    return <tr>
        <th></th>
    </tr>
}