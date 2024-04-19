// Import libraries
import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function BookCard({book, onDelete}) {
    return (
            <div class="flex-row">
                <div class="card-container">
                <img
                    src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
                    alt="Books"
                    height="200"
                />
                
                    <div className="desc">
                        <h2><a href="/show-book/123id">{book.title}</a></h2>
                        <h3>{book.author}</h3>
                        <p>{book.description}</p>
                    </div>
                    <div className=' d-inline-flex p-2 d-flex flex-row'>
                    <button className="float-left" onClick={()=>{onDelete(book._id)}}>x</button>
                </div>
            </div>
      </div>
    );
  }

  // Export the component
  export default BookCard;