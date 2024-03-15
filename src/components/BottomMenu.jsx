import React from 'react'
import './BottomMenu.css'
import { FaHome } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom';

export default function BottomMenu() {
  return (
    <>
        <div className='bottom-menu-container'>
            <button><NavLink className={({isActive}) => { return isActive ? 'link active' : 'link' }} to="/addnew"><MdOutlineBookmarkAdd /></NavLink></button>
            <button><NavLink className={({isActive}) => { return isActive ? 'link active' : 'link' }} to="/"><FaHome /></NavLink></button>
            <button><NavLink className={({isActive}) => { return isActive ? 'link active' : 'link' }} to="/profile"><CgProfile /></NavLink></button>
        </div>
    </>
  )
}
