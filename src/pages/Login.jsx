import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../authContext/AuthContext";
import { toast } from "react-hot-toast";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Login = () => {
  const { dispatch } = useContext(AuthContext)
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const form = e.target;
    if (form.checkValidity()) {
      const loading = toast.loading('loading...')
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const q = query(collection(db, "users"), where('email', '==', user.email));

          const querySnapshot = await getDocs(q);
          const data = []
          querySnapshot.forEach((doc) => {
            data.push({
              ...doc.data(),
              id: doc.id
            })
          });
          dispatch({ type: 'LOGIN', payload: { ...user, ...data[0] } })
          toast.success('logged in', { id: loading })
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.message, { id: loading })
        });
    } else {
      const formData = new FormData(form)
      const validationMessages = Array.from(formData.keys())
        .reduce((acc, key) => {
          acc[key] = form.current.elements[key].validationMessage
          return acc
        }, {})
      toast.error(
        validationMessages.email !== '' ?
          validationMessages.email :
          validationMessages.password !== '' ?
            validationMessages.password : null
      )
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-800 h-[100vh]">
      <div className="bg-gray-300 w-full sm:w-[380px] h-[340px] sm:rounded-md shadow-sm shadow-slate-50">
        <h1 className="text-center text-gray-900 font-bold p-3 text-2xl mt-2">Login</h1>
        <form noValidate className="flex flex-col py-2 px-4" onSubmit={handleLogin}>
          <input ref={email} name="email" type="email" className="mt-1 mb-3 p-3 outline-none rounded-md border-2 border-white focus:border-slate-800" placeholder="Email / Username" />
          <input ref={password} name='password' type="password" className="my-3 p-3 outline-none rounded-md border-2 border-white focus:border-slate-800" placeholder="password" />
          <button className="my-3 bg-blue-700 disabled:bg-slate-400 rounded-md font-bold px-2 py-3 text-white hover:bg-blue-800 transition-all text-lg duration-300 active:scale-95">
            Let me in
          </button>
        </form>
        <p className='px-4 text-slate-600 '>Create account?<Link className='text-blue-700 font-medium' to='/signup'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login