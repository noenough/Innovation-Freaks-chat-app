import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/loginpage.jsx'
import MainPage from './pages/mainpage.jsx'


const router=createBrowserRouter([
  {path:"/loginpage", element: <LoginPage />,},
  {path:"/chat", element:<MainPage /> },
  {path:"/", element:<LoginPage /> }
]);
createRoot(document.getElementById('root')).render(

  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
