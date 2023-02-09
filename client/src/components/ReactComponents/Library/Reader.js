import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../../ApiClient.js';
import Book from './Book.js';
import sky from '../../../pixel/sky.png';
import exit from '../../../pixel/exit_from_library.png';
import Story from './Story.js';
import './library.css';

function Reader(props) {
  const [stories, setStories] = useState([]);
  const [currentBook, setCurrentBook] = useState({});
  const [soundUrl, setSoundUrl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getBooks().then((data) => {
      if (data) setStories([...data]);
    });
  }, []);

  function backToGame() {
    navigate('/game');
  }



  return (
    <>
      <div className='reader'>
        <div className='antiquewhite'>
          <img className='sky' src={sky} />
        </div>

        <img className='exit' onClick={backToGame} src={exit} />

        <div className='stories-container'>
          {stories.map((book) => {
            return (
              <div className='story' key={book._id}>
                <Book book={book} setCurrentBook={setCurrentBook} setSoundUrl={setSoundUrl} />
              </div>
            );
          })}
        </div>

        <div className='current'>
          <Story currentBook={currentBook} soundUrl={soundUrl} />
        </div>
      </div>
    </>
  );
}

export default Reader;
