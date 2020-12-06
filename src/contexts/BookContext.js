import React, { createContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


export const BookContext = createContext();

const bookReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_BOOK':
        return [...state, {
          title: action.book.title, 
          author: action.book.author, 
          id: uuidv4()}
        ]
      case 'REMOVE_BOOK':
        return state.filter(book => book.id !== action.id);
      default:
        return state;
    }
  } 
const BookContextProvider = (props) => {
  const [books, dispatch] = useReducer(bookReducer, [], () => {
    const localData = localStorage.getItem('books');
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);
  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
}

 
export default BookContextProvider;



// import React, { createContext, useState } from 'react';


// export const BookContext = createContext();

// const BookContextProvider = (props) => {
//   const [books, setBooks] = useState([
//     {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
//     {title: 'the final empire', author: 'brandon sanderson', id: 2},
//   ]);
//   const addBook = (title, author) => {
//     setBooks([...books, {title, author, id: uuidv4()}]);
//   };
//   const removeBook = (id) => {
//     setBooks(books.filter(book => book.id !== id));
//   }

//   return (
//     <BookContext.Provider value={{ books, addBook, removeBook }}>
//       {props.children}
//     </BookContext.Provider>
//   );
// }
 
// export default BookContextProvider;