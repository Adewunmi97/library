// class book

class Book {
    constructor(title, author, pages, status) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.status = status;
    }
  }

// UI class

  class UI {
      static displayBooks() {
          const StoredBooks = [
              {
                  title: 'maryian',
                  author: 'lock',
                  pages: '13',
                  status: 'read'

              },

              {
                title: 'ddaryian',
                author: 'locky',
                pages: '19',
                status: 'unread'

              }
          ];

          const books = StoredBooks;
          books.forEach((book) => UI.addBookToList(book));
      }

      static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td>${book.status}</td>
          <td><button class="status-button btn btn-success">${book.status}</button></td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
      }

      static deleteBook(el) {
        if (el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
        }
      }

      static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);

      }

      static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#staus').value = '';
      }
  }


  // Event: display books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);

  // Event: add a book

  document.querySelector('#book-form').addEventListener('submit', (e) => {

  // prevent actual submit
    e.preventDefault();

  // get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const status = document.querySelector('#status').value;

    //validate
    if (title === '' || author === '' || pages === '') {
      UI.showAlert('please fill in all fields', 'danger');
    } else {
       // instatiate book

    const book = new Book(title, author, pages, status);

    // add book to list
    UI.addBookToList(book);

    // show success message
    UI.showAlert('Book Added', 'success');

    // clear fields

    UI.clearFields();

    }
  });



  // Event: remove a book
  document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)

    // show success message
    UI.showAlert('Book Removed', 'success');
  });

  function changeStatus(book) {
    if (library[book].status === 'read') {
      library[book].status = 'not read';
    } else library[book].status = 'read';
  }
