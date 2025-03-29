import React from "react"
import { RouterProvider } from "react-router-dom"
import routes from "./route/routes"
import  { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>

    <RouterProvider router={routes} />
    <Toaster/>
    </>
  )
}

export default App
