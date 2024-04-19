import Home from './Home';
import NotFount from './NotFount';
import Profile from './Profile';
import AddNew from './AddNew';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminGallery from './AdminGallery';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFount />,
    },
    {
        path: '/profile',
        element: <Profile />,
        errorElement: <NotFount />,
    },
    {
        path: '/addnew',
        element: <AddNew />,
        errorElement: <NotFount />,
    },
    {
        path: '/admingallery',
        element: <AdminGallery />,
        errorElement: <NotFount />,
    },
]);

export default function UserContent() {


    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
