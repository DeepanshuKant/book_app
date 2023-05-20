import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const App = () => {

  const [books, setBooks] = useState(localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : []);
  const [updation, setUpdation] = useState(false);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [isbn, setIsbn] = useState('');

  const [selectedBookIndex, setSelectedBookIndex] = useState(-1);



  // useEffect(() => {
  //   const storedBooks = window.localStorage.getItem('books');

  //   if (storedBooks !== null) {
  //     setBooks(JSON.parse(storedBooks));
  //   }
  // }, []);



  useEffect(() => {
    window.localStorage.setItem('books', JSON.stringify(books));
  }, [books]);


  //create new book
  const handleAddBook = (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      year,
      isbn
    };

    let isFound = false;

    if (books.length > 0) {
      for (let i = 0; i < books.length; i++) {
        if (books[i].isbn === newBook.isbn) {
          isFound = true;
          break;
        }
      }
    }


    if (!isFound) {
      setBooks([...books, newBook]);

      setTitle('');
      setAuthor('');
      setYear('');
      setIsbn('');
    } else {
      alert("Books is found with same ISBN, cannot create new book");
    }

    setModal(!modal)


  }




  //Edit book
  const handleEditBook = (index) => {
    setModal(!modal);
    setUpdation(true);
    const selectedBook = books[index];

    setTitle(selectedBook.title);
    setAuthor(selectedBook.author);
    setYear(selectedBook.year);
    setIsbn(selectedBook.isbn);

    setSelectedBookIndex(index);
  };

  //Pol=ulate editBook
  const populateEditBook = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      year,
      isbn
    };

    if (selectedBookIndex !== -1) {

      const updatedBooks = [...books];

      updatedBooks[selectedBookIndex] = newBook;

      setBooks(updatedBooks);
      setSelectedBookIndex(-1);

      setTitle('');
      setAuthor('');
      setYear('');
      setIsbn('');
    }

    setModal(!modal);
  }

  //Delete book
  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
    if (index === selectedBookIndex) {
      setSelectedBookIndex(-1);
    }
  };



  //framer-motion variations
  const variants = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'flex' },
  }

  return (
    <div className="app">

      <div className="navbar">
        <h1>Book Collection</h1>
        <button onClick={() => setModal(!modal)} >Add Book</button>
      </div>

      <motion.form className="form"
        onSubmit={(e) => selectedBookIndex !== -1 ? populateEditBook(e) : handleAddBook(e)}
        variants={variants}
        initial="hidden"
        animate={modal ? "visible" : "hidden"}
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required />

        <label htmlFor="year">Year Published:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required />

        <label htmlFor="isbn">ISBN:</label>
        <input
          type="number"
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required />
        <input type="submit" value={selectedBookIndex !== -1 ? 'Update Book' : 'Add Book'} />
      </motion.form>


      <h2 style={{ color: "#E57C23" }} >Book List, Total: {books.length}</h2>
      {books.length === 0 ? (
        <p style={{ color: "#E57C23" }} >No books available.</p>
      ) : (
        <ul className="book-list">
          {books.map((book, index) => (
            <motion.li key={index} className={`book-item ${index === selectedBookIndex ? 'selected' : ''}`}
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}

              transition={{
                type: "spring",
                bounce: 0.25,
                duration: 0.5,
              }}
            >
              <div>
                <span>Title:</span> {book.title}
              </div>
              <div>
                <span>Author:</span> {book.author}
              </div>
              <div>
                <span>Year Published:</span> {book.year}
              </div>
              <div>
                <span>ISBN:</span> {book.isbn}
              </div>
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => handleEditBook(index)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteBook(index)}
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App;
