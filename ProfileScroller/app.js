const data = [
  {
    name: 'John Doe',
    age: 32,
    gender: 'Male',
    lookingFor: 'Female',
    location: 'Boston MA',
    image: 'https://randomuser.me/api/portraits/men/82.jpg'
  },
  {
    name: 'Joey Taylor',
    age: 28,
    gender: 'Female',
    lookingFor: 'Male',
    location: 'Boston MA',
    image: 'https://randomuser.me/api/portraits/women/82.jpg'
  },
  {
    name: 'Josh Hukigan',
    age: 26,
    gender: 'Male',
    lookingFor: 'Female',
    location: 'Boston MA',
    image: 'https://randomuser.me/api/portraits/men/83.jpg'
  }
];

// calling
const profiles = profileIterator(data);

document.getElementById('next').addEventListener('click', nextProfile);

// on load call function
nextProfile();

function nextProfile() {
  const currentProfile = profiles.next().value;

  if (currentProfile !== undefined) {
    document.getElementById(
      'imgDisplay'
    ).innerHTML = `<img src="${currentProfile.image}">`;

    document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group"> 
       <li class="list-group-item">Name : ${currentProfile.name} </li>
       <li class="list-group-item">Age : ${currentProfile.age} </li>
       <li class="list-group-item">Gender : ${currentProfile.gender} </li>
       <li class="list-group-item">Locaton : ${currentProfile.location} </li>
       <li class="list-group-item">Preference : ${currentProfile.lookingFor} </li>
    <ul>`;
  } else {
    window.location.reload();
  }
}

// Iterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function () {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++], done: false }
        : { done: true };
    }
  };
}
