'use client'
import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const useNavbarContext = () => {
    return useContext(Context);
};

export const NavbarContextProvider = ({ children }) => {
    const [isOpen, setState] = useState(false);

    const toggleSidebar = () => {
        setState(!isOpen)
    };

    return (
        <Context.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </Context.Provider>
    );
};
