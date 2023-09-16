'use client'
import './style.css'
import { useEffect, useRef, useState } from 'react'
import MainLayout from '@/layouts/main'
import Chat from '@/components/chatMessage'
import axios from 'axios'
import { Dots, Plane } from '@/components/icons'


export default function page() {

    const prompt = useRef()
    const chatArea = useRef()
    const [chats, addChat] = useState([])
    const [loading, setLoadingState] = useState(false)
    const [fetching, setFetchingState] = useState(false)


    const submit = async (event) => {
        event.preventDefault()
        const promptInputField = prompt.current
        const text = promptInputField.value.trim()
        if (text != '' && !fetching) {
            appendChat({ user: 'human', msg: text })
            await query(text)
            promptInputField.value = ''
            promptInputField.focus()
        }
    }
    const appendChat = (chat) => {
        addChat((prevChats) => [...prevChats, chat]);
    }
    const query = async (text) => {

        const promptInputField = prompt.current
        try {
            promptInputField.disabled = true
            setLoadingState(true)
            const response = await axios.post('/api/bot', { prompt: text })
            const chat = response.data
            appendChat(chat)
        } catch (error) {
            alert('something went wrong')
        } finally {
            promptInputField.disabled = false
            setLoadingState(false)
        }
    }
    const fetchWindsorData = async () => {
        try {
            setFetchingState(true)
            await axios.get('/api/bot')
        } catch (error) {
            alert('something went wrong while fetching data please refresh the page')
        } finally {
            setFetchingState(false)
        }
    }

    useEffect(() => {
        fetchWindsorData()
    }, [])

    useEffect(()=>{
        chatArea.current.scrollTop = chatArea.current.scrollHeight
    },[chats])

    return <>
        <MainLayout>
            {fetching &&
                <div className="flex items-center p-4 mb-4 text-sm text-blue-500 rounded-lg bg-blue-100 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <div className="text-left">
                        <div className='grid place-content-center'>
                            <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <span className="font-medium">Fetching data</span> please wait.
                    </div>
                </div>}


            <main className="chat_container border rounded-lg flex flex-col justify-between" style={{ height: 'calc(100vh - 120px)' }}>
                <div className='chats grow items-start overflow-auto scrollbar-hide scroll-smooth' ref={chatArea}>
                    {chats.map((chat, key) => <Chat key={key} msg={chat.msg} user={chat.user} />)}
                </div>
                <form className='flex border-2 rounded-lg m-4 py-1 pr-4' onSubmit={submit}>
                    <input type="text"  className='grow border-0 text-sm focus:ring-0' placeholder='Ask me anything' ref={prompt}/>
                    <button className=' rotate-90'>{loading ? <Dots /> : <Plane />}</button>
                </form>
            </main>
        </MainLayout>
    </>
}
