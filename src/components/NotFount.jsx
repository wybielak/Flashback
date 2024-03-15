import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'

export default function NotFount() {
    return (
        <>
            <div className='notfound'>
                <h1>404</h1>
                <p>Tej strony nie ma</p>
                <p>Zapomniałeś?</p>
                <Link className='link' to="/">Wróć</Link>
            </div>
        </>
    )
}
