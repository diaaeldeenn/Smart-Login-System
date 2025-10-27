var regName = document.querySelector(".regName");
var regEmail = document.querySelector(".regEmail");
var regPassword = document.querySelector(".regPassword");
var signUp = document.querySelector("#signUp");
var userEmail = document.querySelector("#userEmail");
var userPassword = document.querySelector("#userPassword");
var loginBtn = document.querySelector("#loginBtn");
var usersArray = [];
var nameWelcome;

if (localStorage.getItem("UsersArray") != null) {
  usersArray = JSON.parse(localStorage.getItem("UsersArray"));
}

function validationName() {
  var regexName = /^[A-Za-z\u0600-\u06FF\s'-]{3,50}$/;
  if (regexName.test(regName.value) === true) {
    regName.classList.add("is-valid");
    regName.classList.remove("is-invalid");
    return true;
  } else {
    regName.classList.remove("is-valid");
    regName.classList.add("is-invalid");
    return false;
  }
}

function validationEmail() {
  var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  if (regexEmail.test(regEmail.value) === true) {
    regEmail.classList.add("is-valid");
    regEmail.classList.remove("is-invalid");
    return true;
  } else {
    regEmail.classList.remove("is-valid");
    regEmail.classList.add("is-invalid");
    return false;
  }
}

function validationPassword() {
  var regexPassword = /^.{8,}$/;
  if (regexPassword.test(regPassword.value) === true) {
    regPassword.classList.add("is-valid");
    regPassword.classList.remove("is-invalid");
    return true;
  } else {
    regPassword.classList.remove("is-valid");
    regPassword.classList.add("is-invalid");
    return false;
  }
}

function regUser() {
  if (validationName() && validationEmail() && validationPassword()) {
    //^ Check Exist Email
    for (var i = 0; i < usersArray.length; i++) {
      if (usersArray[i].email.trim().toLowerCase() === regEmail.value.trim().toLowerCase()) {
        var modal = new bootstrap.Modal(document.getElementById("emailModal"));
        modal.show();
        regEmail.classList.add("is-invalid");
        regEmail.classList.remove("is-valid");
        //^If The Email Exist ---> Stop For Loop And Continue regUser Function
        return;
      }
    }
    var users = {
      name: regName.value,
      email: regEmail.value,
      password: regPassword.value,
    };
    usersArray.push(users);
    localStorage.setItem("UsersArray", JSON.stringify(usersArray));
    window.location.href = "index.html";
    clearInputs();
  }
}

function clearInputs() {
  regName.value = "";
  regEmail.value = "";
  regPassword.value = "";
  regName.classList.remove("is-valid");
  regEmail.classList.remove("is-valid");
  regPassword.classList.remove("is-valid");
}

if (document.body.id === "registerPage") {
  signUp.addEventListener("click", regUser);
  regName.addEventListener("input", validationName);
  regEmail.addEventListener("input", validationEmail);
  regPassword.addEventListener("input", validationPassword);
}

function checkAccounts() {
  //^ لو الأكونت طلع موجود يبقى هنقف عند return
  //^ لو مش موجود يبقى هيكمل ويوصل ل var modal
  for (var i = 0; i < usersArray.length; i++) {
    if (usersArray[i].email.trim().toLowerCase() === userEmail.value.trim().toLowerCase() &&
        usersArray[i].password.trim().toLowerCase() === userPassword.value.trim().toLowerCase()
    ) {
      nameWelcome = usersArray[i].name;
      localStorage.setItem("loggedUserName", nameWelcome);
      window.location.href = "home.html";
      return;
    }
  }
  var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
}


if (document.body.id === "loginPage") {
  loginBtn.addEventListener("click", checkAccounts);
}

function displayWelcomeMsg() {
  var storedName = localStorage.getItem("loggedUserName");
  //^ Can't Access Home Page Without Enter Valid Email And Password
  if (!storedName) {
    window.location.href = "index.html";
    return;
  }

  document.querySelector(".welcomeMsg").innerHTML = `<h1 class="mb-3">Welcome ${storedName}</h1>`;
}


if (document.body.id === "homePage") {
  displayWelcomeMsg();
  document.querySelector(".logOut").addEventListener("click", function () {
    localStorage.removeItem("loggedUserName");
    window.location.href = "index.html";
  });
}

