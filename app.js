function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function deleteBook(el) {
  if (el.classList.contains('delete')) {
    el.parentElement.parentElement.remove();
  }
}

function getBooks() {
  const books = localStorage.getItem('books') === null ? [] : JSON.parse(localStorage.getItem('books'));
  return books;
}

function addBookToList(book) {
  const list = document.querySelector('#book-list');
  const row = document.createElement('tr');
  row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.status}</td>
            <td><button class="status-button btn btn-success editBtn" data-id="${book.id}">${book.status === 'Read' ? 'Unread' : 'Read'}</button></td>
            <td><a href="#" class="btn btn-danger btn-sm delete removeBtn" data-id="${book.id}">X</a></td>
          `;

  list.appendChild(row);
}

function updateBook(id, newStatus) {
  let books = getBooks();

  books = books.map((book) => {
    if (book.id === id) {
      book.status = newStatus;
    }
    return book;
  });
  localStorage.setItem('books', JSON.stringify(books));
}

function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  // vanish in 2 seconds
  setTimeout(() => document.querySelector('.alert').remove(), 2000);
}

function removeBook(id) {
  let books = getBooks();
  books = books.filter((book) => book.id !== id);
  localStorage.setItem('books', JSON.stringify(books));
}

const addDeleteListener = () => {
  document.querySelectorAll('.removeBtn').forEach((ele) => {
    ele.addEventListener('click', (e) => {
      e.preventDefault();
      // Remove book from UI
      deleteBook(e.target);

      // Remove book from store
      removeBook(e.target.getAttribute('data-id'));

      // show success message
      showAlert('Book Removed', 'success');
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
      updateBook(e.target.getAttribute('data-id'), currentValue);

      // show success message
      showAlert('Book Updated', 'success');
    });
  });
};

// UI class

function displayBooks() {
  const books = getBooks();
  if (books === null) {
    return;
  }
  books.forEach((book) => addBookToList(book));

  addDeleteListener();
  addEditListener();
}

function clearFields() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#status').value = '';
}

function addBook(book) {
  const books = getBooks();
  book.id = Date.now().toString();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

// Event: display books
document.addEventListener('DOMContentLoaded', displayBooks);

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
    showAlert('please fill in all fields', 'danger');
  } else {
    // instatiate book

    const book = new Book(title, author, pages, status);
    // console.log("Book |", book);

    // add book to UI
    addBookToList(book);

    // add book to store
    addBook(book);

    // show success message
    showAlert('Book Added', 'success');

    // clear fields

    clearFields();
  }
});
