import React from 'react'
import Home from './components/Home'
import footer from './components/Footer'
import RegisterForm from './components/Register'
import Login from './components/Login'
import RootLayout from './components/RootLayout'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
let router=createBrowserRouter([
      
  {
   path:'',
   element:<RootLayout/>,
   children:[
     {
       path:'',
       element:<Home/>
     },
     {
       path:'Register',
       element:<RegisterForm/>

     },
     {
       path:'Login',
       element:<Login/>
     },
     {
      path:'StudentProfile',
      element:<StudentProfile/>
     }

   ]
  }
 ])


function App() {
  return (
    <div>
       <RouterProvider router={router}/>
    </div>
  )
}

export default App