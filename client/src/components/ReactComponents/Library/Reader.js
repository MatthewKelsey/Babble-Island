import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../../ApiClient.js';
import Book from './Book.js';
import sky from '../../../pixel/sky.png';
import exit from '../../../pixel/exit_from_library.png';
import Story from './Story.js';
import './library.css';
import ChatGPT from './ChatGPT.js';

function Reader({user, setUser}) {
  const [stories, setStories] = useState([]);
  const [currentBook, setCurrentBook] = useState({});
  const [chatGptResponse, setChatGptResponse] = useState('');
  const navigate = useNavigate();

  useEffect(()=> {
    setUser(user)
  }, [])

  useEffect(() => {
    getBooks().then((data) => {
      console.log(data);
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
                <Book book={book} setCurrentBook={setCurrentBook} />
              </div>
            );
          })}
        </div>

        <div className='index'>
          <Story currentBook={currentBook} chatGptResponse={chatGptResponse} user={user} setUser={setUser}/>
        </div>
        <div className='chatGPT'>
          <ChatGPT chatGptResponse={chatGptResponse} setChatGptResponse={setChatGptResponse}/>
        </div>
      </div>
    </>
  );
}

export default Reader;
