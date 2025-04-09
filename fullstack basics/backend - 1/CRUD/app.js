const express = require('express');
const app = express();


const userModel = require('./usemodel')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/create', async (req, res) => {
   let createUser =  await userModel.create({
        name: 'Ayush Ghosh',
        username: 'Ayush123',
        email: "ghoshayush@gmail.com"
    })

    res.send(createUser)
  });

  app.get('/update', async (req, res) => {
    let updateUser =  await userModel.findOneAndUpdate({username: "johndoe123"}, {name: "harsh vandana sharma"}, {new: true})
    res.send(updateUser)
    res.send(createUser)
});

app.get('/read', async (req, res)=>{
    let users = await userModel.find()
    res.send(users)
})

app.get('/delete', async (req, res)=>{

    let deleteUser = await userModel.findOneAndDelete({username: "Ayush123"})
    res.send(deleteUser)
})

app.listen(3000);  