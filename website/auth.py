from flask import Blueprint, render_template,redirect, url_for, request, flash
import json
from . import db
from .models import Users
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user

auth=Blueprint("auth", __name__)

with open('website\config.json', 'r') as c:
                    params = json.load(c)["params"]

@auth.route("/login")
def login():
          if request.method=="POST":
                    logemail=request.form.get("logemail")
                    logpass=request.form.get("logpass")
                    email_exist=Users.query.filter_by(username=logemail).first()
                    pass
          return render_template("login.html",
                                  main_color=params["main_color"],
                                  page_heading="Login",
                                  blog_name=params["blog_name"])
          
@auth.route("/signup", methods=["GET","POST"])
def signup():
          if request.method=="POST":
                    username=request.form.get('username').lower()
                    email=request.form.get('email').lower()
                    password=request.form.get('password')
                    cpassword=request.form.get('cpassword')
                    new_user= Users(email=email, username=username, password=generate_password_hash(password, method='sha256'))
                    db.session.add(new_user)
                    db.session.commit()
                    login_user(new_user, remember=True)
                    return redirect(url_for('views.home'))

          return render_template("signup.html",
                                  main_color=params["main_color"],
                                  page_heading="Sign Up",
                                  blog_name=params["blog_name"])

@auth.route("/logout")
def logout():
          return redirect(url_for("view.home"))

@auth.route("/check_user", methods=["GET","POST"])
def check_user():

          if request.method=="POST":
                    a=request.get_json("params")
                    username=a['username'].lower()
                    username_exist=Users.query.filter_by(username=username).first()
                    if username_exist:
                              return "yes"
                    else:
                              return "no"
                    
          else:
                    return redirect("/")



@auth.route("/check_email", methods=["GET","POST"])
def check_email():

          if request.method=="POST":
                    a=request.get_json("params")
                    email=a['email'].lower()
                    email_exist=Users.query.filter_by(email=email).first()
                    if email_exist:
                              return "yes"
                    else:
                              return "no"
                    
          else:
                    return redirect("/")