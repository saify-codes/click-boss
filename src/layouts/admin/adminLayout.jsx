'use client'
import React from 'react'
import Navbar from '@/components/admin/navbar'
export default function main({ children }) {
    return <>
        <Navbar />
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-gray-200 rounded-lg mt-14">
                {children}
            </div>
        </div>
    </>
}