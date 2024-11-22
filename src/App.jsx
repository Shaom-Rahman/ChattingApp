import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './Component/Register/Register'
import './Component/Common/CommonRegister.css'
import Login from './Component/Login/Login'
import app from './FirebaseConfig'
import { ToastContainer, toast } from 'react-toastify';
import ForgetPass from './Component/Forget/ForgetPass'
import LayoutOne from './Component/Layouts/LayoutOne'
import Home from './Pages/Home'
import AllUserPage from './Pages/AllUserPage'

function App() {
 const myRoute = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/' element={<LayoutOne/>} > 
    <Route index element={<Home/>} />
    <Route path='/allUsers' element={<AllUserPage/>} />
    </Route>
    <Route  path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/forgetpass' element={<ForgetPass/>} />
  </Route> 
 ))
  return (
    <>
    <RouterProvider router={myRoute}/>
    <ToastContainer />
    </>
  )
}

export default App
