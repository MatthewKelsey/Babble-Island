import React, { useEffect } from 'react';
import './library.css';
import item from '../../../pixel/book.png';

function Book({ book, setCurrentBook }) {
  useEffect(() => {
    console.log(book);
  });

  return (
    <div className='book' onClick={() => setCurrentBook(book)}>
      <img className='cover' src={item} />
      <div className='book-title'>{book.title}</div>
    </div>
  );
}

export default Book;
