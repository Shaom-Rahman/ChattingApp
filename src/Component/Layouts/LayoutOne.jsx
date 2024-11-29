import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const LayoutOne = () => {
  const sliceUser = useSelector((state) => state.currentUser.value)
  const Navigate = useNavigate()

  useEffect (()=> {
    if(sliceUser == null){
      // ------------- navigate data ----------- 
      Navigate('/login')
      // ------------- local storage data -------------
      localStorage.removeItem('user')
    }
  } , [])
  
  return (
    <>
    <Navbar/>
    <Outlet/>
    
    </>
  )
}

export default LayoutOne 