import React from "react"
import { RouterProvider } from "react-router-dom"
import Routes from "./route/routes"
import  { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>

    <RouterProvider router={Routes} />
    <Toaster/>
    </>
  )
}

export default App
