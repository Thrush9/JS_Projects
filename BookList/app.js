// book constuctor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {
  UI.prototype.addBookToList = function (book) {
    // add tr
    const row = document.createElement('tr');
    // add data
    row.innerHTML = ` <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete"> X </a></td>`;
    list.appendChild(row);
  };

  UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  };

  UI.prototype.showAlert = function (msg, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  };

  UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  };
}

const form = document.querySelector('#book-form');
const container = document.querySelector('.container');
const list = document.getElementById('book-list');

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
    uiObj.clearFields();
    uiObj.showAlert('Book added successfully!', 'success');
  }

  e.preventDefault();
});

list.addEventListener('click', function (e) {
  const uiObj = new UI();
  uiObj.deleteBook(e.target);
  uiObj.showAlert('Book Removed Succesfully', 'success');
  e.preventDefault();
});
