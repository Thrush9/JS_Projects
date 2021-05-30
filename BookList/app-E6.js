const form = document.querySelector('#book-form');
const container = document.querySelector('.container');
const list = document.getElementById('book-list');

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    // add tr
    const row = document.createElement('tr');
    // add data
    row.innerHTML = ` <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete"> X </a></td>`;
    list.appendChild(row);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAlert(msg, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }
}

class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Storage.getBooks();
    books.forEach(function (book) {
      const uiObj = new UI();
      uiObj.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    console.log(isbn);
    const books = Storage.getBooks();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Storage.displayBooks);

form.addEventListener('submit', function (e) {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // book object
  const book = new Book(title, author, isbn);
  // UI object
  const uiObj = new UI();

  if (title === '' || author === '' || isbn === '') {
    uiObj.showAlert('Please check your input!', 'error');
  } else {
    //add book to UI Object
    uiObj.addBookToList(book);
    Storage.addBook(book);
    uiObj.clearFields();
    uiObj.showAlert('Book added successfully!', 'success');
  }

  e.preventDefault();
});

list.addEventListener('click', function (e) {
  const uiObj = new UI();
  uiObj.deleteBook(e.target);
  Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
  uiObj.showAlert('Book Removed Succesfully', 'success');
  e.preventDefault();
});
