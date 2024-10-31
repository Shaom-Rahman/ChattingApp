import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './Component/Register/Register'
import './Component/Common/CommonRegister.css'
import Login from './Component/Login/Login'

function App() {
 const myRoute = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
  </Route> 
 ))
  return (
    <>
    <RouterProvider router={myRoute}/>
      
    </>
  )
}

export default App
