'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import MainLayout from '@/layouts/main'
import Avatar from '@/components/avatar'
import PasswordUpdateForm from '@/components/passwordUpdateForm'
import UserInfo from '@/components/userInfo'


export default function page() {
    const session = useSession()
    const [image, setImge] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [isSocialLogin, setLoginType] = useState()

    useEffect(() => {
        setImge(session.data?.image)
        setName(session.data?.name)
        setEmail(session.data?.email)
        setLoginType(session.data?.social_login)
    }, [session])
    return <>
        <MainLayout>
            <div className='space-y-10'>
                <section>
                    {/* <h1 className='text-xl font-semibold'>User settings</h1> */}
                    <div className='mt-5 flex gap-3 relative'>
                        <Avatar src={image} />
                        <UserInfo name={name} email={email}/>
                    </div>
                </section>

                <section>
                    <h1 className='text-xl font-semibold'>Update password</h1>
                    <div className='mt-5'>
                        <PasswordUpdateForm socialLogin={!!isSocialLogin} />
                    </div>
                </section>
            </div>
        </MainLayout>
    </>
}

