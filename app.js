import UI from './UI.js'
import Store from './Store.js'

// class book
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }


// UI class


// store.js

// Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  // prevent actual submit
  e.preventDefault();

  // get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const status = document.querySelector('#status').value;

  // validate
  if (title === '' || author === '' || pages === '') {
    UI.showAlert('please fill in all fields', 'danger');
  } else {
    // instatiate book

    const book = new Book(title, author, pages, status);
    // console.log("Book |", book);

    // add book to UI
    UI.addBookToList(book);

    // add book to store
    Store.addBook(book);

    // show success message
    UI.showAlert('Book Added', 'success');

    // clear fields

    UI.clearFields();
  }
});

// Event: remove a book
const addDeleteListener = () => {
  document.querySelectorAll('.removeBtn').forEach((ele) => {
    ele.addEventListener('click', (e) => {
      e.preventDefault();
      // Remove book from UI
      UI.deleteBook(e.target);

      // Remove book from store
      Store.removeBook(e.target.getAttribute('data-id'));

      // show success message
      UI.showAlert('Book Removed', 'success');
    });
  });
};

const addEditListener = () => {
  document.querySelectorAll('.editBtn').forEach((ele) => {
    ele.addEventListener('click', (e) => {
      // Toggle the button text when clicked Read/Unread
      const currentValue = e.target.textContent;
      const statusText = e.target.parentElement.previousElementSibling;
      if (currentValue.toLowerCase() === 'read') {
        e.target.textContent = 'Unread';
      } else {
        e.target.textContent = 'Read';
      }
      statusText.textContent = currentValue;

      // Update the book inthe store
      Store.updateBook(e.target.getAttribute('data-id'), currentValue);

      // show success message
      UI.showAlert('Book Updated', 'success');
    });
  });
};
