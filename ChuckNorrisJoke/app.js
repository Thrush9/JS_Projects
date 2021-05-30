const btn = document.querySelector('.get-jokes');
const input = document.querySelector('input[type="number"]');

btn.addEventListener('click', getJokes);

function getJokes(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${input.value}`, true);

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      let output = '';

      if (response.type === 'success') {
        response.value.forEach((element) => {
          output += `<li>${element.joke}</li>`;
        });
      } else {
        output += '<li>Something Went Wrong! Please Try Again!</li>';
      }
      document.querySelector('.jokes').innerHTML = output;
    }
  };

  xhr.send();
  e.preventDefault();
}
