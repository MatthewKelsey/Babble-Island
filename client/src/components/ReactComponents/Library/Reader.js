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
  console.log('READER')
  const [stories, setStories] = useState([]);
  const [currentBook, setCurrentBook] = useState({});
  console.log({currentBook})
  const [chatGptResponse, setChatGptResponse] = useState({});
  console.log({chatGptResponse})
  const [isClicked, setIsClicked] = useState(false)
  const navigate = useNavigate();

  // useEffect(()=> {
  //   setUser(user)
  // }, [])

  console.log(chatGptResponse)

  useEffect(() => {
    getBooks().then((data) => {
      console.log(data);
      if (data) setStories([...data]);
    });
  }, []);

  function backToGame() {
    navigate('/game');
  }

  
  const chatGptNotAuthorisedMessage = "You need to collect at least 1 star to have access to this feature."
  
  const userStars = 2 


  function checkForAuthorisedOrNot() {

    if(userStars > 1 ) {
      setIsClicked(!isClicked)
    }
    }
  

  return (
    <>
      <div className='reader'>
        <div className='antiquewhite'>
          <img className='sky' src={sky} />
        </div>

        <img className='exit' onClick={backToGame} src={exit} />
        
        <h1 onClick={checkForAuthorisedOrNot}>CLICK ME </h1>

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
          <Story currentBook={currentBook} chatGptResponse={chatGptResponse} user={user} setUser={setUser} chatGptNotAuthorisedMessage={chatGptNotAuthorisedMessage}/>
        </div>
        {isClicked && 
        <div className='chatGPT'>
          <ChatGPT chatGptResponse={chatGptResponse} setChatGptResponse={setChatGptResponse}/>
        </div>}
      </div>
    </>
  );
}

export default Reader;
