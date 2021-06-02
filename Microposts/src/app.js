import { http } from './http';
import { uiObj } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);
document.querySelector('#posts').addEventListener('click', enableEdit);
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then((data) => {
      uiObj.showPosts(data);
    })
    .catch((err) => console.log(err));
}

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  if (title === '' || body === '') {
    uiObj.showAlert('Please Fill Out All Fields!', 'alert alert-danger text-center');
  } else {
    const data = { title, body };
    if (id === '') {
      http
        .post('http://localhost:3000/posts', data)
        .then((data) => {
          uiObj.showAlert('Post Added Successfully!', 'alert alert-success text-center');
          uiObj.clearFields();
          getPosts();
        })
        .catch((err) => console.log(err));
    } else {
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          uiObj.showAlert('Post Updated Successfully!', 'alert alert-success text-center');
          uiObj.changeFormState('add');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are You Sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          uiObj.showAlert('Post Deleted Successfully!', 'alert alert-danger text-center');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
  e.preventDefault();
}

function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.parentElement.previousElementSibling.children[0].textContent;
    const body = e.target.parentElement.parentElement.previousElementSibling.children[1].textContent;
    const data = { id, title, body };
    uiObj.fillform(data);
  }
  e.preventDefault();
}

function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    uiObj.changeFormState('add');
  }
  e.preventDefault();
}
