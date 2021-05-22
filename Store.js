class Store {
    static getBooks() {
      const books = localStorage.getItem('books') === null ? [] : JSON.parse(localStorage.getItem('books'));
      return books;
    }

    static addBook(book) {
      const books = Store.getBooks();
      book.id = Date.now().toString();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(id) {
      let books = Store.getBooks();
      books = books.filter((book) => book.id !== id);
      localStorage.setItem('books', JSON.stringify(books));
    }

    static updateBook(id, newStatus) {
      let books = Store.getBooks();

      books = books.map((book) => {
        if (book.id === id) {
          book.status = newStatus;
        }
        return book;
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  export default Store;