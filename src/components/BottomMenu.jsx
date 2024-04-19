import './BottomMenu.css'
import { FaHome } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GrGallery } from "react-icons/gr";
import { NavLink } from 'react-router-dom';
import { auth } from '../config/FirebaseConfig'
import { IDadmin1 } from '../config/AdminIds'

export default function BottomMenu() {
  return (
    <>
        <div className='bottom-menu-container'>
            <button><NavLink className={({isActive}) => { return isActive ? 'link active' : 'link' }} to="/addnew"><MdOutlineBookmarkAdd /></NavLink></button>
            <button><NavLink className={({isActive}) => { return isActive ? 'link active' : 'link' }} to="/"><FaHome /></NavLink></button>
            <button><NavLink className={({isActive}) => { return isActive ? 'link active' : 'link' }} to="/profile"><CgProfile /></NavLink></button>
            {auth?.currentUser?.uid == IDadmin1 ? <button><NavLink className={({isActive}) => { return isActive ? 'link active' : 'link' }} to="/admingallery"><GrGallery /></NavLink></button> : null}
        </div>
    </>
  )
}
