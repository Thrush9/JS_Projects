// listen for submit
// let val = document.getElementsByClassName('pt-4');
// val.style.backgroundColor = 'red';
// let val1 = document.getElementById('results');
// val1.style.backgroundColor = 'red';
// console.log(val1);

const form = document.getElementById('loan-form');
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');

const montlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('loader').style.display = 'block';
  document.getElementById('results').style.display = 'none';
  setTimeout(calculateResult, 2000);
});

function calculateResult() {
  const principal = parseFloat(amount.value);
  const calInterest = parseFloat(interest.value) / 100 / 12;
  const calPayment = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calInterest, calPayment);
  const monthly = (principal * x * calInterest) / (x - 1);
  if (isFinite(monthly)) {
    console.log(1);
    montlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calPayment).toFixed(2);
    totalInterest.value = (monthly * calPayment - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loader').style.display = 'none';
  } else {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    showError('please check your input');
  }
}

function showError(message) {
  const errDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errDiv.className = 'alert alert-danger';
  errDiv.appendChild(document.createTextNode(message));
  card.insertBefore(errDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
