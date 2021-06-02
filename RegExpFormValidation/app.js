const nameInput = document.getElementById('name');
const zipcodeInput = document.getElementById('zipcode');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

nameInput.addEventListener('blur', validateName);
zipcodeInput.addEventListener('blur', validateZipcode);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);

function validateName() {
  const reg = /^[a-zA-Z]{2,10}$/;
  if (!reg.test(nameInput.value)) {
    nameInput.classList.add('is-invalid');
  } else {
    nameInput.classList.remove('is-invalid');
  }
}

function validateZipcode() {
  const reg = /^[0-9]{3}(\s)?[0-9]{3}$/;
  if (!reg.test(zipcodeInput.value)) {
    zipcodeInput.classList.add('is-invalid');
  } else {
    zipcodeInput.classList.remove('is-invalid');
  }
}

function validateEmail() {
  const reg = /^([a-zA-z0-9_\-\.]+)@([a-zA-z0-9_\-\.]+)\.([a-zA-z]{2,5})$/;
  if (!reg.test(emailInput.value)) {
    emailInput.classList.add('is-invalid');
  } else {
    emailInput.classList.remove('is-invalid');
  }
}

function validatePhone() {
  const reg = /^[0-9]{10}$/;
  if (!reg.test(phoneInput.value)) {
    phoneInput.classList.add('is-invalid');
  } else {
    phoneInput.classList.remove('is-invalid');
  }
}
