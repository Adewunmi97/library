class UI {
    static displayBooks() {
      const books = Store.getBooks();
      if (books === null) {
        return;
      }
      books.forEach((book) => UI.addBookToList(book));

      addDeleteListener();
      addEditListener();
    }

    static addBookToList(book) {
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

      // vanish in 2 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#pages').value = '';
      document.querySelector('#status').value = '';
    }
  }

  export default UI;