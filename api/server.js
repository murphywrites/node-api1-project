// BUILD YOUR SERVER HERE

const express = require('express');
const generate = require('shortid').generate
const dbFunctions = require('./users/model')
const app = express()
app.use(express.json())

// app.get('/api/users', (req, res) => {
//     res.status(200)
// })

// let office = [ {id:generate(), name: "Mike", role: "dev"}, {id:generate(), name: "Dwight", role: "designer"}]

app.post('/api/users', async (req, res) => {
    console.log("here's the req", req.body)
    const user = req.body
    const {name, bio} = user
    if(!user.name || !user.bio) {  //
        res.status(400).json({message: "Please provide name and bio for the user"})
    } else {
        try {
            let newUser = await dbFunctions.insert(user)
                res.status(201).json(newUser)
            } catch (error) {
                res.status(500).json({ message: "There was an error while saving the user to the database"})
            }
        }
        
            
    }
)

app.get('/api/users', async (req, res) => {
    try{
    const arrayOfUsers = await dbFunctions.find()
    res.status(200).json(arrayOfUsers)
    } catch {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id
    try{
        const thisUser = await dbFunctions.findById(id)
       thisUser ? res.status(200).json(thisUser) :
       res.status(404).json({message: "The user with the specified ID does not exist" })
    } catch {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
    
})

app.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id
    try{
        const thisDeletedUser = await dbFunctions.remove(id)
        thisDeletedUser ? res.status(200).json(thisDeletedUser) :
        res.status(404).json({message: "The user with the specified ID does not exist" })
     } catch {
         res.status(500).json({ message: "The user could not be removed" })
     }
     
 })

app.put('/api/users/:id', async (req, res) => {
    const id = req.params.id
    const user = req.body
    const {name, bio} = user
    if(!user.name || !user.bio) {  //
        res.status(400).json({message: "Please provide name and bio for the user"})
    } else {
    try{
        const thisUserById = await dbFunctions.findById(id)
        if (thisUserById) {
            const updatedUser = await dbFunctions.update(id, user)
            updatedUser ? res.status(200).json(updatedUser) : 
            res.status(500).json({message: "The user information could not be modified"})
        } else {res.status(404).json({message: "The user with the specified ID does not exist" })}
    } catch {
        res.status(500).json({message: "The user information could not be modified"})
    }
}
}
)
// When the client makes a `PUT` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist" }`.

// - If the request body is missing the `name` or `bio` property:

//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ message: "Please provide name and bio for the user" }`.

// - If there's an error when updating the _user_:

//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ message: "The user information could not be modified" }`.

// - If the user is found and the new information is valid:

//   - update the user document in the database using the new information sent in the `request body`.
//   - respond with HTTP status code `200` (OK).
//   - return the newly updated _user document_.

app.use("*", (req, res) => {
    res.status(404).json({message: "404 not found"})
})

module.exports = {app}; // EXPORT YOUR SERVER instead of {}


// #### Endpoint Specifications

// When the client makes a `PUT` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist" }`.

// - If the request body is missing the `name` or `bio` property:

//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ message: "Please provide name and bio for the user" }`.

// - If there's an error when updating the _user_:

//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ message: "The user information could not be modified" }`.

// - If the user is found and the new information is valid:

//   - update the user document in the database using the new information sent in the `request body`.
//   - respond with HTTP status code `200` (OK).
//   - return the newly updated _user document_.