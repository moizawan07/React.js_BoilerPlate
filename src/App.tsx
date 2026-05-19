import { BrowserRouter } from "react-router-dom"
import {Toaster} from 'react-hot-toast'
import { Routes } from "./routes/router"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, initializeAuth } from "./redux/slices/authSlice"
import { useEffect } from "react"


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // check user login status on app load and initialize auth state from localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        dispatch(initializeAuth(authData));
      } catch (error) {
        console.error("Failed to parse auth data:", error);
      }
    }
  }, [dispatch]);

  console.log('user ==>', user);
  

  return (
    <>
    <Toaster position="top-right"/>
     <BrowserRouter>
       <Routes />
     </BrowserRouter>
    </>
  )
}

export default App