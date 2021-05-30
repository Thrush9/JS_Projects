const searchUser = document.getElementById('searchUser');
const github = new Github();
const uiObj = new UI();

searchUser.addEventListener('keyup', (e) => {
  const userText = e.target.value;
  if (userText != '') {
    console.log(userText);
    github.getUser(userText).then((data) => {
      if (data.profile.message === 'Not Found') {
        //show alert
        uiObj.showAlert('User Not Found!', 'alert alert-danger');
      } else {
        //show profile
        uiObj.showProfile(data.profile);
        console.log(data.repos);
        uiObj.showRepos(data.repos);
      }
    });
  } else {
    //clear profile
    uiObj.clearProfile();
  }
  e.preventDefault();
});
