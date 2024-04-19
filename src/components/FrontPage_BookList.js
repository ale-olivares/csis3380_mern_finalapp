// Import libraries
import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BookCard from './card_Book';

function BookList() {
    const [books, setBooks] = useState([]);
    const BASE_URL = process.env.REACT_APP_URL_BACKEND;
  
    useEffect(() => {
      // axios.get('http://localhost:5000/api/')
      axios.get(`${BASE_URL}/`)
          .then(res =>{ console.log(res.data)
            setBooks(res.data);
            
          })
          .catch((err) => {
            console.log('Error from BookList');
          });
    }, []);

    const onDelete = (id) =>{
      axios.delete(`${BASE_URL}/`+ id )
      .then(res =>{ console.log(res.data)
        setBooks(books.filter((el) => el._id !== id))
      })
      .catch((err) => {
        console.log('Error Deleting Book');
      });
    }

  
    const bookList =
      books.length === 0
        ? 'there is no book record!'
        : books.map((book, k) => <BookCard book={book} id= {book._id} key={k} onDelete={onDelete} />);
  
    return (
      <div className='BookList'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <br />
              <h2 className='display-4 text-center'>Books List</h2>
              <h3>{books.length}</h3>
            </div>
  
            <div className='col-md-11'>
              <Link
                to='/create-book'
                className='btn btn-outline-warning float-right'>+ Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div>
          </div>
  
          <div className='list'>{bookList}</div>
        </div>
      </div>
    );
  }

  // Export the component
  export default BookList;