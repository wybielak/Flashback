import React from 'react'
import Header from './Header'
import Home from './Home';
import NotFount from './NotFount';
import Profile from './Profile';
import AddNew from './AddNew';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFount />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/addnew',
        element: <AddNew />,
    },
]);

export default function UserContent() {


    return (
        <>
            <Header />
            <RouterProvider router={router} />
        </>
    )
}
