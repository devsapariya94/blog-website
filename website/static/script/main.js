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
  document.getElementById('login-btn').disabled = true;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/login', true);
  element = document.getElementById('login_warning');
  xhr.onload = function () {
    if (this.responseText == "yes") {
      window.location = "/sucsses";
    }
    if (this.responseText == "no") {
      element.style.opacity = "1";
      document.getElementById('login-btn').disabled = false;
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

function ValidateEmail() {

  var emailAdress = document.getElementById("logemail").value
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    
    document.getElementById('forgetpass-btn').disabled = false;
  }
  else {
    window.alert("Formate of E-Mail is incorrect")
    document.getElementById('forgetpass-btn').disabled = true;
  }
}

function after_forgetpass() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/forgetpass', true);
  document.getElementById('forgetpass-btn').disabled = true;
  var content = document.getElementById("forgetpass_content")
  var content2 = document.getElementById("forgetpass_email_sent")
  content.style.display = "none";
  content2.style.display = "block";
  xhr.onprogress = function () {

  }

  var email = document.getElementById('logemail').value;
  params = { "email": email };
  xhr.send(JSON.stringify(params));
}



function reset_check_pass() {
  const element = document.getElementById("reset_warning");
  if (document.getElementById('new_pass').value == document.getElementById('new_pass_c').value) {
    if (document.getElementById('new_pass').value.length < 8) {
      element.style.opacity = "1";
      element.innerHTML = "The password should be in atleast 8 charcter long";
      document.getElementById('reset-pass-btn').disabled = true;
    }
    else {
      element.style.opacity = "0";
      element.innerHTML = "*";
      document.getElementById('reset-pass-btn').disabled = false;
    }
  }

  else {
    element.style.opacity = "1";
    element.innerHTML = "Passwords are not same";
    document.getElementById('reset-pass-btn').disabled = true;
  }

}



function reset_pass() {
  document.getElementById('reset-pass-btn').disabled = true;
  path=window.location.pathname
  const xhr = new XMLHttpRequest();
  var content = document.getElementById("pass_reset_content")
  var content2 = document.getElementById("pass_reset")
  xhr.open('POST', path, true);
  xhr.onload = function () {
    if (this.responseText == "yes") {
console.info("yes")
content.style.display = "none";
content2.style.display = "block";
    }
    if (this.responseText == "no") {

    }
  }
  var password = document.getElementById('new_pass').value
  params = { "pass": password};
  xhr.send(JSON.stringify(params));
}
