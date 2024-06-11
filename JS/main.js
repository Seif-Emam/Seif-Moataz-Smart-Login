var sing_up_div = document.querySelector('.sing-up-div');
var Signin_link = document.querySelector('#Signin-link');
var signUp_link = document.querySelector('#Signup-link');

var SignUp_Name = document.getElementById('SignUp_Name');
var SignUp_Email = document.getElementById('SignUp_Email');
var SignUp_Password = document.getElementById('SignUp_Password');
var userContainer = [];

if (localStorage.getItem('Smart-login') == null) {
  userContainer = [];
} else {
  userContainer = JSON.parse(localStorage.getItem('Smart-login'));
}


var exist = document.querySelector('.exist');


function adduser() {
  if (!validateAllInputs()) {
    console.log("ERROR: Invalid input");
    return;
  }

  if (isEmailExist(SignUp_Email.value)) {

    exist.classList.replace('d-none', 'd-block');

    console.log("ERROR: Email already exists");
    return;
  }

  var add = {
    name: SignUp_Name.value,
    email: SignUp_Email.value,
    pass: SignUp_Password.value
  };

  userContainer.push(add);
  localStorage.setItem('Smart-login', JSON.stringify(userContainer));
  console.log(userContainer);
  clearForm()
  sing_up_div.classList.add("active");
}

function isEmailExist(email) {
  for (var i = 0; i < userContainer.length; i++) {
    if (userContainer[i].email.toLowerCase() === email.toLowerCase()) {
      return true;
    }
  }
  return false;
}

signUp_link.addEventListener("click", (e) => {
  e.preventDefault();
  sing_up_div.classList.add("active");
});
Signin_link.addEventListener("click", (e) => {
  e.preventDefault();
  sing_up_div.classList.remove("active");
});

function checklogin() {

  var username = localStorage.getItem('name')
  document.getElementById('username').innerHTML = " Welcome " + username;

}
function loginUser() {
  var email = document.querySelector('#Sign_in_Email').value;
  var password = document.querySelector('#Signin_Password').value;

  for (var i = 0; i < userContainer.length; i++) {
    if (userContainer[i].email.toLowerCase() === email.toLowerCase() && userContainer[i].pass === password) {
      console.log("login");
      localStorage.setItem('name', userContainer[i].name);
      window.location.href = 'home.html';
      return true;
    
  }else{
document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'

  console.log("Error");
  return false;
}
}
}
document.getElementById('loginButton').addEventListener('click', loginUser);




function validateInput(elem) {
  const regex = {
    SignUp_Name: /^(?!.*[-_]{2,})(?![-_])[a-zA-Z0-9-_]{3,16}(?<![-_])$/,
    SignUp_Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    SignUp_Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  };

  if (regex[elem.id].test(elem.value)) {
    console.log('MATCH');
    elem.classList.add('is-valid');
    elem.classList.remove('is-invalid');
    elem.nextElementSibling.classList.replace('d-block', 'd-none');
    return true;
  } else {
    console.log('NO MATCH');
    elem.classList.add('is-invalid');
    elem.classList.remove('is-valid');
    elem.nextElementSibling.classList.replace('d-none', 'd-block');

    return false;
  }
}

function validateAllInputs() {
  var isNameValid = validateInput(SignUp_Name);
  var isEmailValid = validateInput(SignUp_Email);
  var isPassValid = validateInput(SignUp_Password);

  return isNameValid && isEmailValid && isPassValid;
}

function clearForm() {
  SignUp_Name.value = '';
  SignUp_Email.value = '';
  SignUp_Password.value = '';
  SignUp_Name.classList.remove("is-valid")
  SignUp_Email.classList.remove("is-valid")
  SignUp_Password.classList.remove("is-valid")
  var exist = document.querySelector('.exist');

  exist.classList.replace('d-block', 'd-none');



}
function logout() {
  localStorage.removeItem('name');
  window.location.href = 'index.html';
}

document.getElementById('Log-out').addEventListener('click', logout);

