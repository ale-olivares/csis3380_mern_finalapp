import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect,  } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () =>{
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const BASE_URL = process.env.REACT_APP_URL_BACKEND;
    const navigate = useNavigate();


    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeAuthor = (e) => {
        setAuthor(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault(); 

        const book = { // create a book object
            title,
            author,
            description
        }

        // Send the book object to the backend
        axios.post(`${BASE_URL}/`, book)
            .then(res => {
                console.log(res.data)
                navigate("/");
            })
            .catch(err => console.log(err));

       
    }

    return(
        <div class="CreateBook">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
            <br />
                <Link
                to='/'
                className='btn btn-info float-left'>Show BooK List
              </Link>
            </div>

            
            <div class="col-md-8 m-auto">
              <h1 class="display-4 text-center">Add Book</h1>
              <p class="lead text-center">Create new book</p>
              <form novalidate="">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Title of the Book"
                    name="title"
                    class="form-control"
                    spellcheck="false"
                    data-ms-editor="true"
                    onChange={onChangeTitle}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Author"
                    name="author"
                    class="form-control"
                    spellcheck="false"
                    data-ms-editor="true" 
                    onChange={onChangeAuthor}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Describe this book"
                    name="description"
                    class="form-control"
                    spellcheck="false"
                    data-ms-editor="true"
                    onChange={onChangeDescription}
                  />
                </div>
                <input type="submit" class="btn btn-info btn-block mt-4" onClick={onSubmit}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

  // Export the component
  export default AddBook;