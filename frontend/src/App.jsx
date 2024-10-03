import './App.css'
import { useContext, useEffect } from 'react'
import Login from './pages/Login/Login'
import  SignUp  from './pages/SignUp/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import  Home  from './pages/Home/Home'  
import { Toaster } from 'react-hot-toast'
import { AuthContext } from './context/auth'

function App() {

  const { auth } = useContext(AuthContext)
useEffect(() => {
  console.log("Auth: ", auth)
}
, [auth])

  return (
    <>
        <div className='min-h-screen'>
          <Router>
            <Routes>
              <Route path="/" element={auth?<Home />:<Login/>} />
              <Route path="/login" element={auth?<Home/>:<Login />} />
              <Route path="/signup" element={auth?<Home/>:<SignUp/>} />
            </Routes>
          </Router>
        </div>
        <Toaster />
    </>
  )
}

export default App