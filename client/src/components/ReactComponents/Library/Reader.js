import React from 'react';
import { useEffect, useState } from 'react';
import {getBooks} from '../../ApiClient.js'
import Book from './Book.js';
import './library.css';

function Reader(props) {
    const [stories, setStories] = useState([])

    useEffect(() => {
        getBooks().then(data => {

          if (data) setStories([...data])
        });
      }, []);

    console.log(stories)



    return (
        <div className='stories-container'>
            {stories.map((book) => {
                return <Book book={book} />
            })}
        </div>
    );
}

export default Reader;