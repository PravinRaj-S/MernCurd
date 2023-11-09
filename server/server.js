const express   =  require('express')
const mongoose  = require('mongoose')
const cors      = require('cors')
const userModal = require('./model/UserModal')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/users")

app.post("/createuser", async (req, res) =>{

    try{
        const {name, city, age} = req.body
        const newUser = new userModal({name, city, age})
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(error){
        console.log('Error while saving the user: ', error)
        res.status(500).json({error: "Error while save the user"})
    }
    
})

app.get('/', async (req, res) =>{
    try {
        const users = await userModal.find({})
        res.status(201).json(users)
    } catch (error) {
        console.log('Error while fetching the user: ', error)
        res.status(500).json({error: "Error while fetching the user"})
    }
})

app.get('/getuser/:id', async (req, res)=>{
    const id = req.params.id

    try {
        const user = await userModal.findById(id)
        res.status(201).json(user)
    } catch (error) {
        console.log('Error while fetching the user: ', error)
        res.status(500).json({error: "Error while fetching the user"})
    }
})


app.post('/updateuser/:id', async (req, res) => {
    const id = req.params.id
    const {name, city, age} = req.body

    try {
        const updateUser = await userModal.findByIdAndUpdate(id, {name, city, age}, {new:true})

        if (!updateUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(201).json(updateUser)
    } catch (error) {
        console.error('Error while updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post("/deleteuser/:id", async (req, res)=>{
    const id = req.params.id

    try {
        const deletedUser = await userModal.findOneAndDelete({ _id: id });

        if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error while deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


app.listen(8000, () =>{
    console.log("server is running")
})