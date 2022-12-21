from flask import Blueprint, render_template, request, redirect, url_for, session
from . import mail, params, app
from flask_login import login_user, logout_user, login_required, current_user
posts = Blueprint("posts", __name__)

@posts.route("/new-post", methods=["GET", "POST"])
def new_post():
    if  current_user.is_authenticated:
        if request.method == "POST":
            title = request.form.get("title")
            body = request.form.get("body")
            post = Post(title=title, body=body)
            db.session.add(post)
            db.session.commit()
            return redirect(url_for("post.post", id=post.id))
        else:
            return render_template("new_post.html",main_color=params["main_color"],
                                  blog_name=params["blog_name"])
    session['url'] = url_for('posts.new_post')
    return redirect(url_for("auth.login"))
