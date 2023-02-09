import React, { useEffect } from 'react';
import './library.css';
import item from '../../../pixel/book.png';
import { storyReader } from '../../ApiClient.js';

function Book({ book, setCurrentBook }) {
  useEffect(() => {
    
  });

 async function selectBook(){
    console.log('book chosen')
    setCurrentBook(book)
    const blob = await storyReader(book.story)
    console.log(blob)
  }


  return (
    <div className='book' onClick={selectBook}>
      <img className='cover' src={item} />
      <div className='book-title'>{book.title}</div>
    </div>
  );
}

export default Book;
