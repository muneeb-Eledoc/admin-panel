
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { AuthContext } from './authContext/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { useState } from 'react';

function App() {
  const {currentUser, dispatch} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=>{

    const get_Jobs = async()=>{
      if(!currentUser) return setIsLoading(false)
      setIsLoading(true)
      const q = query(collection(db, "users"), where('email', '==', currentUser.email));

      const querySnapshot = await getDocs(q);
      const data = []
      querySnapshot.forEach((doc) => {
          data.push({
              ...doc.data(),
              id: doc.id
          })
      });
      dispatch({type:'LOGIN', payload: {...currentUser, ...data[0]}})
      setIsLoading(false)
  }
  get_Jobs()
  }, [])

  const RequiredRoute = ({ children }) => {
    return currentUser ? children : <Navigate to='/login' />
  }

  return (
    <>
      <BrowserRouter>
        <div><Toaster /></div>
        <Routes>
          <Route path='/' element={isLoading?'loading...':<RequiredRoute><Dashboard /></RequiredRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
