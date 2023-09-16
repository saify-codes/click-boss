'use client'
import React, { useState } from 'react'
import MainLayout from '@/layouts/main'
import Facebook from './facebook'
import Google from './google'

export default function page() {

    const [activeTab, setTab] = useState('facebook')
    const renderTabContent = () => {
        switch (activeTab) {
            case 'facebook':
                return <Facebook />
            case 'google':
                return <Google />
            default:
                return null;
        }
    };
    return <MainLayout>
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px">
                <li class="mr-2">
                    <button class={`inline-block p-4 border-b-2 ${activeTab == 'facebook' ? 'text-primary-500 border-primary-500' : 'border-transparent'} rounded-t-lg`} onClick={() => setTab('facebook')}>Facebook</button>
                </li>
                <li class="mr-2">
                    <button class={`inline-block p-4 border-b-2 ${activeTab == 'google' ? 'text-primary-500 border-primary-500' : 'border-transparent'} rounded-t-lg`} onClick={() => setTab('google')}>Google</button>
                </li>
            </ul>
        </div>
        <div className='py-5'>
            {renderTabContent()}
        </div>

    </MainLayout>
}


