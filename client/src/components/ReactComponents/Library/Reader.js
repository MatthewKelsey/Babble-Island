import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {getBooks} from '../../ApiClient.js'
import Book from './Book.js';
// import storyBox from '../../../pixel/story_box_big.png'
import sky from '../../../pixel/sky.png';
import exit from '../../../pixel/exit_from_library.png'
import Story from './Story.js';
import './library.css';

function Reader(props) {
    const [stories, setStories] = useState([]);
    const [currentBook, setCurrentBook] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        getBooks().then(data => {
            console.log(data)
          if (data) setStories([...data])
        });
      }, []);

      function backToGame (){
        navigate('/game')
            }

    return (
        <>
          <div className='reader'>

            <img className='sky' src={sky}/>

            <img  className = 'exit' onClick={backToGame} src={exit}/>

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

            <Story
            currentBook={currentBook}/>

          </div>
        </>
    );
}

export default Reader;