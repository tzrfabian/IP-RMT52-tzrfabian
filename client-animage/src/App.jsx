import { RouterProvider } from "react-router-dom"
import { router } from "./Router"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer/>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
