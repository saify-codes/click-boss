import React from 'react'
import { NavbarContextProvider } from '@/context/navbar'
import Nav from './nav'
import Aside from './aside'
export default function navbar() {
    return <NavbarContextProvider>
        <Nav />
        <Aside />
    </NavbarContextProvider>
}
