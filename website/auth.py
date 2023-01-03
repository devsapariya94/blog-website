import re
from flask import Blueprint, render_template,redirect, url_for, request, flash,session
import json
from . import db
from .models import Users
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
import time
from flask_mail import Mail, Message
from . import mail, params, app
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer
import requests
import os
from oauthlib.oauth2 import WebApplicationClient
import jwt
from time import time
fortoken=Serializer("super-super-secret",1800)

auth=Blueprint("auth", __name__)



@auth.route("/login", methods=["GET","POST"])
def login():
          if request.method=="POST":
                    get_json=request.get_json("params")
                    email=get_json['email'].lower()
                    password_get=get_json['password']
                    user=Users.query.filter_by(email=email).first()
                    session['url'] = url_for('views.home')
                    if check_password_hash(user.password, password_get):
                              login_user(user, remember=True)
                              return "yes"
                    else:
                              return "no"      
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
                    new_user= Users(email=email, username=username, password=generate_password_hash(password, method='sha256'))
                    db.session.add(new_user)
                    db.session.commit()
                    login_user(new_user, remember=True)
                    return redirect(url_for('views.home'))
          elif current_user.is_authenticated :
                    return redirect("/home")
          return render_template("signup.html",   
                                  main_color=params["main_color"],
                                  page_heading="Sign Up",
                                  blog_name=params["blog_name"])

@auth.route("/logout")
def logout():
          if current_user.is_authenticated :
          
                    logout_user()
                    return redirect("/login")
          else:
                    return  render_template("404.html",
                                  main_color=params["main_color"],
                                  page_heading="Page not Found",
                                  blog_name=params["blog_name"])



@auth.route("/check_user", methods=["GET","POST"])
def check_user():

          if request.method=="POST":
                    get_json=request.get_json("params")
                    username=get_json['username'].lower()
                    username_exist=Users.query.filter_by(username=username).first()
                    if username_exist:
                              return "yes"
                    else:
                              return "no"
                    
          else:
                    return redirect("/")

@auth.route("/forgetpass", methods=["GET","POST"])
def forgetpass():
    if request.method=="POST":
        get_json=request.get_json("params")
        email=get_json['email'].lower()
        email_exist=Users.query.filter_by(email=email).first()
        if email_exist:
            user=Users.query.filter_by(email=email).first()
            token = jwt.encode({'user-id': user.id, 'exp': time() + 1200},app.config['SECRET_KEY'], algorithm='HS256')
            link="http://localhost:5000/reset_request/"+token
            print(token)
            sub="Forget Password? No worries."
            msg = Message(sub ,recipients=[email], sender=params["email"])
            msg.html = '<html><body>    <a href="http://localhost:5000" style="text-decoration: none; font-size: 45px; font-weight: bold; font-family: cursive;">'+params["blog_name"]+'</a><h1 style="text-align: center;">Don&rsquo;t Worry if u Forget Password</h1>   <p>Hii, </p><div>    &nbsp; &nbsp; I am a computer from <a href="localhost:5000">'+params["blog_name"]+'</a>. I send this massage because u have requested for reset password.    <br>    &nbsp; &nbsp; Click below for further steps.</div>    <br>    <br>    <br>    <div style="text-align: center;">   <a href="'+link+'" style="align-items: center;background-color: chartreuse;font-weight: bold;color: black;border: 2px solid rgb(216, 2, 134);border-radius: 0px;padding: 18px 36px;display: inline-block;font-size: 14px;letter-spacing: 1px;cursor: pointer; ">Click here!</a></div><br><div style="text-align: center;">past the following link in the browser<br>'+link+'</div><br><div style:"text-align:center">If You do not request than ignore this mail</div></body></html>'
            mail.send(msg)
            return "Sent"
        else:
                              return "no"
    else:
        return render_template("forgetpass.html",   
                                  main_color=params["main_color"],
                                  page_heading="Forget Password",
                                  blog_name=params["blog_name"])


@auth.route("/reset_request/<token>",methods=["GET","POST"])
def request_reset(token):
    try:
        user=jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id=user['user-id']
        user=Users.query.filter_by(id=user_id).first()
        if user:
                return render_template("reset_request.html",
                                        main_color=params["main_color"],
                                        page_heading="Reset Password",
                                        blog_name=params["blog_name"])
        else:    
                return render_template("404.html",
                                        main_color=params["main_color"],
                                        page_heading="Page not Found",
                                        blog_name=params["blog_name"])
    except:
        return render_template("404.html", 
                                main_color=params["main_color"],    
                                page_heading="Page not Found",
                                blog_name=params["blog_name"])
    finally:
        if request.method=="POST":
            get_json=request.get_json("params")
            password=get_json['pass']
            print("pass")
            user.password=generate_password_hash(password, method='sha256')
            db.session.commit()
            print("done")
            return "yes"

       
    

@auth.route("/check_email", methods=["GET","POST"])
def check_email():

          if request.method=="POST":
                    get_json=request.get_json("params")
                    email=get_json['email'].lower()
                    email_exist=Users.query.filter_by(email=email).first()
                    if email_exist:
                              return "yes"
                    else:
                              return "no"
                    
          else:
                    return redirect("/")


@auth.route("/success")
def login_done():
    return redirect(session['url'])