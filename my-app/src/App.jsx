import Home from './components/Home'
// import navbar from './components/navbar'
// import Footer  from './components/footer'
import Register from './components/Register'
import Login from './components/Login'
import RootLayout from './components/RootLayout'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css';
import StudentProfile from './components/StudentProfile'
import CompanyProfile from './components/CompanyProfile'
// import { Write_article } from './components/write_article'
// import View_article from './components/View_article'
function App() {
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
         element:<Register/>
  
       },
       {
         path:'Login',
         element:<Login/>
       },
       {
        path:'studentprofile',
        element:<StudentProfile/>
      },
      {
        path:'companyprofile',
        element:<CompanyProfile/>
      }
      
      
     
     
     ]
    }
   ])
  return (
    
      <div>
     <RouterProvider router={router}/>
     </div>
           

    
    
  );
}

export default App;
