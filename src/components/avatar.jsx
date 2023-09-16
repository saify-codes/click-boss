import React from 'react'
import './css/avatar.css'

export default function (props) {
    return <>
        <div className={`avatar w-20 h-20 rounded-lg overflow-hidden`}>
            {props.src && <img src={props.src} className='object-cover w-full h-full' alt='profile pic'/>}
        </div>
    </>
}
