import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../authContext/AuthContext'
import Navbar from '../components/Navbar'
import { toast } from 'react-hot-toast'
import { addDoc, collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <div>
            <Navbar currentUser={currentUser} />
            <main>
                { currentUser.isAdmin ? <AdminSide /> : <UserSide />}
            </main>
        </div>
    )
}

const UserSide = () => {
    return (
        <div>
            user side
        </div>
    )
}
const AdminSide = () => {
    const [cityInput, setCityInput] = useState('')
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [childCats, setChildCats] = useState([])
    const [categoryData, setCategoryData] = useState({
        name: '',
        city: ''
    })
    const [subCategoryData, setSubCategoryData] = useState({
        name: '',
        category: ''
    })
    const [childCatData, setChildCatData] = useState({
        name: '',
        subcategory: ''
    })

    useEffect(() => {
        const fetchCities = async () => {
            const q = query(collection(db, "cities"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                });
                setCities(data);
            });
        }
        fetchCities()

        const fetchCategories = async () => {
            const q = query(collection(db, "categories"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                });
                setCategories(data);
            });
        }
        fetchCategories()

        const fetchSubCategories = async () => {
            const q = query(collection(db, "subcategories"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                });
                setSubCategories(data);
            });
        }
        fetchSubCategories()

        const fetchChildCats = async () => {
            const q = query(collection(db, "childCats"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                });
                setChildCats(data);
            });
        }
        fetchChildCats()
    }, [])

    const handleAddCity = async () => {
        if (cityInput.length < 3) return toast.error('Please enter a city')
        const loading = toast.loading('loading...')
        const docRef = await addDoc(collection(db, "cities"), {
            name: cityInput
        });
        toast.success('City added', { id: loading })
    }

    const handleCategoryChange = (e) => {
        setCategoryData({
            ...categoryData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubCategoryChange = (e) => {
        setSubCategoryData({
            ...subCategoryData,
            [e.target.name]: e.target.value
        })
    }
    
    const handleChildCatChange = (e) => {
        setChildCatData({
            ...childCatData,
            [e.target.name]: e.target.value
        })
    }

    const handleAddCategory = async () => {
        if (categoryData.name.length < 3 || !categoryData.city) return toast.error('Please fill the form properly')
        const loading = toast.loading('loading...')
        const docRef = await addDoc(collection(db, "categories"), {
            name: categoryData.name,
            city: categoryData.city
        });
        toast.success('Category added', { id: loading })
    }

    const handleAddSubCategory = async()=>{
        if (subCategoryData.name.length < 2 || !subCategoryData.category) return toast.error('Please fill the form properly')
        const loading = toast.loading('loading...')
        const docRef = await addDoc(collection(db, "subcategories"), {
            name: subCategoryData.name,
            category: subCategoryData.category
        });
        toast.success('Sub category added', { id: loading })

    }

    const handleAddChildCats = async()=>{
        if (childCatData.name.length < 2 || !childCatData.subcategory) return toast.error('Please fill the form properly')
        const loading = toast.loading('loading...')
        const docRef = await addDoc(collection(db, "childCats"), {
            name: childCatData.name,
            subcategory: childCatData.subcategory
        });
        toast.success('Child category added', { id: loading })
    }
    return (
        <div className='grid grid-cols-4 m-5 border border-gray-200 p-3 gap-3 rounded-lg mt-4'>
            <div className="flex col-span-1 flex-col gap-3">
                <div className="flex flex-col p-3 border border-gray-200 gap-3">
                    <h1 className='font-semibold'>Add City</h1>
                    <input onChange={(e) => setCityInput(e.target.value)} className='border border-gray-200 px-3 py-2 outline-none' type="text" placeholder='enter city name' />
                    <button onClick={handleAddCity} className='px-3 py-1 bg-gray-600 text-white'>Add</button>
                </div>
                <div className="flex flex-col">
                    <h1 className='font-semibold'>Cities</h1>
                    <div className="flex flex-col gap-1">
                        {cities.map((c, i) => (
                            <div key={i}>
                                {i + 1} -
                                {c.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex col-span-1 flex-col gap-3">
                <div className="flex flex-col p-3 border border-gray-200 gap-3">
                    <h1 className='font-semibold'>Add Category</h1>
                    <input onChange={handleCategoryChange} name={'name'} className='border border-gray-200 px-3 py-2 outline-none' type="text" placeholder='Enter Category' />
                    <select onChange={handleCategoryChange} className='border border-gray-200 px-3 py-2 outline-none' name="city">
                        <option value="">Select City</option>
                        {cities.map((c, i) => (
                            <option key={i} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                    <button onClick={handleAddCategory} className='px-3 py-1 bg-gray-600 text-white'>Add</button>
                </div>
                <div className="flex flex-col mt-2">
                    <h1 className='font-semibold'>Categories</h1>
                    <div className="flex flex-col gap-2">
                        {categories.map((c, i) => (
                            <div key={i} className='flex gap-3'>
                                <span>
                                    {i + 1}-
                                </span>
                                <div className='flex flex-col'>
                                    <span className='font-medium'>{c.name}</span>
                                    <span className='text-xs'>{c.city}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex col-span-1 flex-col gap-3">
                <div className="flex flex-col p-3 border border-gray-200 gap-3">
                    <h1 className='font-semibold'>Add Sub Category</h1>
                    <input onChange={handleSubCategoryChange} name={'name'} className='border border-gray-200 px-3 py-2 outline-none' type="text" placeholder='Enter Sub Category' />
                    <select onChange={handleSubCategoryChange} className='border border-gray-200 px-3 py-2 outline-none' name="category">
                        <option value="">Select Category</option>
                        {categories.map((c, i) => (
                            <option key={i} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                    <button onClick={handleAddSubCategory} className='px-3 py-1 bg-gray-600 text-white'>Add</button>
                </div>
                <div className="flex flex-col mt-2">
                    <h1 className='font-semibold'>Sub Categories</h1>
                    <div className="flex flex-col gap-2">
                        {subCategories.map((c, i) => (
                            <div key={i} className='flex gap-3'>
                                <span>
                                    {i + 1}-
                                </span>
                                <div className='flex flex-col'>
                                    <span className='font-medium'>{c.name}</span>
                                    <span className='text-xs'>{c.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex col-span-1 flex-col gap-3">
                <div className="flex flex-col p-3 border border-gray-200 gap-3">
                    <h1 className='font-semibold'>Add Child Category</h1>
                    <input onChange={handleChildCatChange} name={'name'} className='border border-gray-200 px-3 py-2 outline-none' type="text" placeholder='Enter Child Category' />
                    <select onChange={handleChildCatChange} className='border border-gray-200 px-3 py-2 outline-none' name="subcategory">
                        <option value="">Select Sub Category</option>
                        {subCategories.map((c, i) => (
                            <option key={i} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                    <button onClick={handleAddChildCats} className='px-3 py-1 bg-gray-600 text-white'>Add</button>
                </div>
                <div className="flex flex-col mt-2">
                    <h1 className='font-semibold'>Child Categories</h1>
                    <div className="flex flex-col gap-2">
                        {childCats.map((c, i) => (
                            <div key={i} className='flex gap-3'>
                                <span>
                                    {i + 1}-
                                </span>
                                <div className='flex flex-col'>
                                    <span className='font-medium'>{c.name}</span>
                                    <span className='text-xs'>{c.subcategory}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard