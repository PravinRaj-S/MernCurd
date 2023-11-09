import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Main = () => {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()


  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const response = await axios.get("http://localhost:8000")
        setUsers(response.data)
      } catch (error) {
        console.error('Error while fetching users:', error);
      }
    }

    (async () => fetchUser())()
  }, [])


  const deletUser = async (id)=>{
    try {
      const response = await axios.post(`http://localhost:8000/deleteuser/${id}`)
      window.location.reload()
    } catch (error) {
      console.error('Error while deleting users:', error);
    }
  }


  return (
    <div className='container my-5'>
        <Link to="/createuser"><button className='btn btn-primary'>Add User</button></Link>
        <table className="table my-3">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">City</th>
                <th scope="col">Age</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>

              {
                users.map((user)=>(
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.city}</td>
                    <td>{user.age}</td>
                    <td><Link to={`/updateuser/${user._id}`}><button className='btn btn-warning text-white'>Update</button></Link></td>
                    <td><button onClick={(e) =>deletUser(user._id)} className='btn btn-danger text-white'>Delete</button></td>
                  </tr>
                ))
              }
            </tbody>
            </table>
    </div>
  )
}

export default Main