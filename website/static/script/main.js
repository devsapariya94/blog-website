function check_pass() {
  const element = document.getElementById("signup_warning");
  if (document.getElementById('password').value == document.getElementById('cpassword').value) {
    if (document.getElementById('password').value.length < 8) {
      element.style.opacity = "1";
      element.innerHTML = "The password should be in atleast 8 charcter long";
      document.getElementById('signup-btn').disabled = true;
    }
    else {
      element.style.opacity = "0";
      element.innerHTML = "*";
      document.getElementById('signup-btn').disabled = false;
    }
  }

  else {
    element.style.opacity = "1";
    element.innerHTML = "Passwords are not same";
    document.getElementById('signup-btn').disabled = true;
  }

}


function check_user() {

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/check_user', true);
  element = document.getElementById('signup_warning');
  xhr.onload = function () {
    if (this.responseText == "yes") {
      element.style.opacity = "1";
      element.innerHTML = "Username is already in use";
      document.getElementById('signup-btn').disabled = true;
      document.getElementById('email').disabled = true;
      document.getElementById('password').disabled = true;
      document.getElementById('cpassword').disabled = true;

    }
    if (this.responseText == "no") {
      element.style.opacity = "0";
      element.innerHTML = "*";
      document.getElementById('signup-btn').disabled = false;
      document.getElementById('email').disabled = false;
      document.getElementById('password').disabled = false;
      document.getElementById('cpassword').disabled = false;

    }
  }
  var user = document.getElementById('username').value
  params = { "username": user };
  xhr.send(JSON.stringify(params));
}


function check_email() {

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/check_email', true);
  element = document.getElementById('signup_warning');
  xhr.onload = function () {
    if (this.responseText == "yes") {
      element.style.opacity = "1";
      element.innerHTML = "Email is already in use";
      document.getElementById('signup-btn').disabled = true;
      document.getElementById('password').disabled = true;
      document.getElementById('cpassword').disabled = true;

    }
    if (this.responseText == "no") {
      element.style.opacity = "0";
      element.innerHTML = "*";
      document.getElementById('signup-btn').disabled = false;
      document.getElementById('password').disabled = false;
      document.getElementById('cpassword').disabled = false;

    }
  }
  var email = document.getElementById('email').value
  params = { "email": email };
  xhr.send(JSON.stringify(params));
}



function check_email_for_login() {

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/check_email', true);
  element = document.getElementById('login_warning');
  xhr.onload = function () {
    if (this.responseText == "yes") {

      element.style.opacity = "0";
      element.innerHTML = "*";
      document.getElementById('login-btn').disabled = false;


    }
    if (this.responseText == "no") {
      element.style.opacity = "1";
      element.innerHTML = "No user with this email found, Please check the email";
      document.getElementById('login-btn').disabled = true;

    }
  }
  var email = document.getElementById('logemail').value
  params = { "email": email, };
  xhr.send(JSON.stringify(params));
}


function check_password_for_login() {

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/login', true);
  element = document.getElementById('login_warning');
  xhr.onload = function () {
    if (this.responseText == "yes") {
      window.location = "/sucsses";
    }
    if (this.responseText == "no") {
      element.style.opacity = "1";
      element.innerHTML = "Password is incorret, Please double check it.";
    }
  }
  var email = document.getElementById('logemail').value
  var password = document.getElementById("logpass").value
  params = { "email": email, "password": password };
  element.style.opacity = "0";
  element.innerHTML = "*";
  xhr.send(JSON.stringify(params));
}


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function after_forgetpass() {
  const xhr = new XMLHttpRequest();
  console.log("asd");
  xhr.open('POST', '/forgetpass', true);
  var content = document.getElementById("forgetpass_content")
  xhr.onload = function () {
    content.innerHTML="<div style>";
  }
  var email = document.getElementById('logemail').value;
  params = { "email": email };
  xhr.send(JSON.stringify(params));
}