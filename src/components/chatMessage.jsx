'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'


export default function chatMessage({user, msg}) {
    const session = useSession()
    const [image, setImge] = useState()
    useEffect(() => {
        setImge(user == 'bot'? '/bot.png' :session.data?.image)
    }, [session])

    return<div className={`chat flex gap-3 ${user == 'bot'? 'bg-white' : 'bg-gray-100'} p-3 border-b`}>
            <div className="avatar w-8 h-8 shrink-0">
                <img src={image} />
            </div>
            <div className="content text-sm whitespace-pre-wrap">
                {msg}
            </div>
        </div>
}
