import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {

    const [formData, setFormData] = useState({
        name:'',
        age:'',
        city:''

    })

    const navigate = useNavigate();


    const handlesubmit = async (e) =>{
        e.preventDefault()
        console.log(formData);
        try {
            const response = await axios.post('http://localhost:8000/createuser', formData)
            navigate('/')
        } catch (error) {
            console.error('Error while adding the user:', error);
        }
    }

  return (
    <div className='container my-5'>
        <div className="card">
            <div className="card-header">
                Create User
            </div>
            <div className="card-body">
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-control" placeholder='Enter Your Name' onChange={(e) => setFormData({...formData, name:e.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">City:</label>
                        <input type="text" className="form-control" placeholder='Enter Your City' onChange={(e) => setFormData({...formData, city:e.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Age:</label>
                        <input type="text" className="form-control" placeholder='Enter Your Age' onChange={(e) => setFormData({...formData, age:e.target.value})}/>
                    </div>                    
                    
                    <button  className="btn btn-primary">Create User</button>
                </form>                
            </div>
        </div>
    </div>
  )
}

export default CreateUser