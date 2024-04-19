// Import libraries
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require('dotenv').config(); //to use .env file

// Create app and define port
const app = express()
const port = process.env.PORT || 5000;

// Implement middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Establish connection with database
const URI = process.env.ATLAS_URI; 
//const databasename = "Mybooks"
//const URI = `mongodb://localhost:27017/${databasename}` 
//const URI = "mongodb+srv://alejandraolivares06:fW0ics5Q1ARIUHdw@cluster0.wdi8i67.mongodb.net/Mybooks"
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((data)=> {
        console.log("Connected to MongoDB Server")
        app.listen(port, ()=>{
            console.log("Server is running on port " + port)
        })
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB: " + err )
    })

// Define an schema
const Schema = mongoose.Schema
const bookSchema = new Schema({
    title: {type:String, required: true}, 
    author: {type:String, required: true},
    description: {type:String}
});

// Create a collection for the created schema
const BookRecord = mongoose.model("BookRecord", bookSchema); //two arguments: collection name, schema

// Define routes using Router
const router = express.Router()
app.use("", router) 

// @route GET '/'
// @description Get all books
router.route("/").get((req, res)=>{
    BookRecord.find() 
        .then((books)=> res.json(books)) 
        .catch((err)=> res.status(400).json("Error happened!"))
});

// @route GET '/:id'
// @description Get single book by id
router.route("/:id").get((req, res)=>{
    BookRecord.findById(req.params.id)
        .then((book)=>res.json(book))
        .catch((err)=>res.status(400).send("Error: " + err))
})

// @route POST '/'
// @description add/save book
router.route("/").post((req, res)=>{
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;

    //Create new book object
    const newBook = new BookRecord({
        title,
        author,
        description
    })

    //Save new book in the collection
    newBook.save()
            .then((savedBook)=> res.json("Book Added"))
            .catch((err)=> res.status(400).json("Error: " + err))

})

// @route PUT '/:id'
// @description update book by ID
router.route("/:id").put((req,res)=>{
    BookRecord.findById(req.params.id)
        .then((book)=>{ //If we find the book, we update it
            book.title = req.body.title;
            book.author = req.body.author,
            book.description = req.body.description
        
            book.save() //We save the changes
                .then(()=>res.json("Book updated"))
        })
        .catch((err)=> res.status(400).json("Error: " + err))
})

// @route DELETE '/:id'
// @description Delete book by ID
router.route("/:id").delete((req,res)=>{
    BookRecord.findByIdAndDelete(req.params.id)
        .then(()=> res.json("Book Deleted!"))
        .catch((err)=> res.status(400).json("Error: " + err))
})

