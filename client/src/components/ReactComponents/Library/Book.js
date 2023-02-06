import React, { useEffect} from 'react'

function Book({book}) {
 useEffect(() => {
   console.log(book)
 })


  return (

      <div className='book'>
{book.title}
    <img src={book.cover} />
    <div>{book.title}</div>
  </div>

  )
}

export default Book