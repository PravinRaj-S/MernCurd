import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUser = () => {
    const {id} = useParams()
    const [formData, setFormData] = useState({
        name:'',
        city:'',
        age:''
    })

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchUser = async ()=>{
            try {
                const response = await axios.get('http://localhost:8000/getuser/'+id)
                setFormData(prevData =>({...prevData, name:response.data.name, city:response.data.city, age:response.data.age}))
            } catch (error) {
                console.log("Error while fetching user data", error)
            }
        }

        (async ()=> fetchUser())()
    },[])


    const handlesubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/updateuser/${id}`, formData)
            navigate('/')
        } catch (error) {
            console.error('Error while updating the user:', error);
        }
    }


  return (
    <div className='container my-5'>
        <div className="card">
            <div className="card-header">
                Update User
            </div>
            <div className="card-body">
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" value={formData.name} className="form-control" placeholder='Enter Your Name' onChange={(e) => setFormData({...formData, name:e.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">City:</label>
                        <input type="text" value={formData.city} className="form-control" placeholder='Enter Your City' onChange={(e) => setFormData({...formData, city:e.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Age:</label>
                        <input type="text" value={formData.age} className="form-control" placeholder='Enter Your Age' onChange={(e) => setFormData({...formData, age:e.target.value})}/>
                    </div>                    
                    
                    <button type="submit" className="btn btn-primary">Update User</button>
                </form>                
            </div>
        </div>
    </div>
  )
}

export default UpdateUser