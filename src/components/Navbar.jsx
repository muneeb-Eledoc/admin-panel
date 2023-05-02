import React, { useContext } from 'react'
import { AuthContext } from '../authContext/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ currentUser }) => {
    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()


    const handleLogOut = () => {
        localStorage.removeItem('currentUser')
        dispatch({
            type: 'LOGOUT'
        })
        navigate('/')
    }

    return (
        <div>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="ml-3 text-xl">Manager</span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        {/* <a className="mr-5 hover:text-gray-900">First Link</a>
                        <a className="mr-5 hover:text-gray-900">Second Link</a>
                        <a className="mr-5 hover:text-gray-900">Third Link</a>
                        <a className="mr-5 hover:text-gray-900">Fourth Link</a> */}
                    </nav>
                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                        {currentUser?.email}
                    </button>
                    <button onClick={handleLogOut} className='mx-3 bg-blue-500 px-3 py-1 text-white font-medium'>Logout</button>
                </div>
            </header>
        </div>
    )
}

export default Navbar