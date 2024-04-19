import './Header.css'
import { auth } from '../config/FirebaseConfig'
import { NavLink } from 'react-router-dom'

export default function Header() {

    return (
        <>
            <NavLink className='header-link' to="/"><h3 className='header-title'>Flashback</h3></NavLink>
            <div className='header-container'>
                <div className='profile-small'>
                    <img src={auth?.currentUser?.photoURL} alt="" />
                    {auth?.currentUser?.uid == 'PX2GVRO2wzL1RtJoU0FxuE9nnrh2' ? <p><strong>A</strong></p> : null}
                </div>
                <p>{auth?.currentUser?.displayName}</p>
            </div>
        </>
    )
}
