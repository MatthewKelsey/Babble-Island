import React from 'react';
import { useEffect, useState } from 'react';
import {getBooks} from '../../ApiClient.js'
import Book from './Book.js';
// import storyBox from '../../../pixel/story_box_big.png'
import Story from './Story.js';
import './library.css';

function Reader(props) {
    const [stories, setStories] = useState([]);
    const [currentBook, setCurrentBook] = useState({});


    useEffect(() => {
        getBooks().then(data => {
            console.log(data)
          if (data) setStories([...data])
        });
      }, []);

    console.log(stories);
    console.log(currentBook);



    return (
        <>
          <div className='reader'>
            <div className='stories-container'>
                {stories.map((book) => {
                    return <div className='story' key={book._id}>
                        <Book
                        book={book}
                        setCurrentBook= {setCurrentBook}
                        />
                        </div>
                })}
            </div>

            <div className='open-book'>
                {/* <div className='relative'>
                    <img className='bookBg' src={storyBox}/> */}
                    <Story
                    currentBook={currentBook}/>

                {/* </div> */}


            </div>
          </div>
        </>
    );
}

export default Reader;