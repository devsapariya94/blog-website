function check_pass() 
{
  const element = document.getElementById("password_not_match");
  if (document.getElementById('password').value == document.getElementById('cpassword').value) 
  {
    if (document.getElementById('password').value.length<8 ){
      element.style.opacity = "1";
      element.innerHTML = "The password should be in atleast 8 charcter long";
      document.getElementById('signup-btn').disabled = true;
    }
    else{
    element.style.opacity = "0"
    element.innerHTML = "*";
    document.getElementById('signup-btn').disabled = false;}
  } 
  
  else 
  {
    element.style.opacity = "1";
    element.innerHTML = "Passwords are not same";
    document.getElementById('signup-btn').disabled = true;
  }

}


function check_user() {

const xhr = new XMLHttpRequest();
xhr.open('POST', '/check_user', true);
element=document.getElementById('password_not_match');
xhr.onload = function () {
      if (this.responseText=="yes") {
        element.style.opacity = "1";
        element.innerHTML = "Username is already in use";
        document.getElementById('signup-btn').disabled = true;
        document.getElementById('email').disabled=true;
        document.getElementById('password').disabled=true;
        document.getElementById('cpassword').disabled=true;

        }
        if (this.responseText=="no") {
        element.style.opacity = "0";
        element.innerHTML = "*";
        document.getElementById('signup-btn').disabled = false;
        document.getElementById('email').disabled=false;
        document.getElementById('password').disabled=false;
        document.getElementById('cpassword').disabled=false;

      }
  }
  var user = document.getElementById('username').value
  params = { "username": user };
  xhr.send(JSON.stringify(params));
}


function check_email() {

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/check_email', true);
  element=document.getElementById('password_not_match');
  xhr.onload = function () {
        if (this.responseText=="yes") {
          element.style.opacity = "1";
          element.innerHTML = "Email is already in use";
          document.getElementById('signup-btn').disabled = true;
          document.getElementById('password').disabled=true;
          document.getElementById('cpassword').disabled=true;
  
          }
          if (this.responseText=="no")  {
          element.style.opacity = "0";
          element.innerHTML = "*";
          document.getElementById('signup-btn').disabled = false;
          document.getElementById('password').disabled=false;
          document.getElementById('cpassword').disabled=false;
  
        }
    }
    var email = document.getElementById('email').value
    params = { "email": email };
    xhr.send(JSON.stringify(params));
  }
  