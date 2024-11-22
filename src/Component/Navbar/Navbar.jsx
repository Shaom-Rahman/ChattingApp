import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { useSelector } from 'react-redux';


const Navbar = () => {
    // -------------------- variables part -----------------
const  Navigate = useNavigate()
    // --------------------- redux data ---------------------- 
    const sliceUser = useSelector((state) => state.currentUser.value)
    // ------------------------ all functions ----------------------
    const handelLogout = ()=>{
        Navigate('/login')
    }

  return (
    <>
    <nav className='p-3 right-4 bg-BrandColor absolute top-[10%] translate-y-[-10%] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-lg'>
        <div className="menuGroup items-center flex flex-col gap-7 ">
            <Link to={'/allUsers'}> <FaUser className='text-3xl hover:text-white'/> </Link>
            <Link to={'/'}> 
            <div className='w-[40px] h-[40px] rounded-full overflow-hidden bg-slate-300 border-4 border-BrandColor hover:text-BrandColor  '> 
                <img src={sliceUser?.photoURL} alt='profile'/>
            </div>
            </Link>
            <Link to={'/'}> <FaUserPlus className='text-4xl hover:text-white'/> </Link>
            <Link to={'/'}> <FaUserTimes className='text-4xl hover:text-white'/> </Link>
            <Link to={'/'}> <FaUserFriends className='text-4xl hover:text-white'/> </Link>
            <Link to={'/'}> <BiSolidMessageDetail className='text-4xl hover:text-white'/> </Link>
            <button onClick={handelLogout} > <IoLogOut className='text-5xl text-center hover:text-white'/> </button>
        </div>
    </nav>
    </>
  )
}

export default Navbar