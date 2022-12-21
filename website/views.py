from flask import Blueprint,render_template,url_for,session
import json
from . import params

views=Blueprint("views", __name__)

@views.route("/")
@views.route("/home")
def home():
          session['url'] = url_for('views.home')
          return render_template("home.html",
                               bg_img="url(/static/img/{})".format(params["home_background_img"]),
                               main_color=params["main_color"],
                               blog_name=params["blog_name"],
                               page_subheading=params["blog_subheading"],
                               page_heading=params["blog_name"])


@views.route("/tt")
def test():
    return render_template("test.html")