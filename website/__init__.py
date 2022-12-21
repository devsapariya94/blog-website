from flask import Flask,render_template
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
import json
from flask_mail import Mail, Message

with open('website/config.json', 'r') as c:
                    params = json.load(c)["params"]


db=SQLAlchemy()
mail=Mail()
DB_NAME="database.db"
app=Flask(__name__)
def create_app():
        

          app.config['MAIL_SERVER']='smtp.gmail.com'
          app.config['MAIL_PORT'] = 465
          app.config['MAIL_USERNAME'] = params["email"]
          app.config['MAIL_PASSWORD'] = params["pass"]
          app.config['MAIL_USE_TLS'] = False
          app.config['MAIL_USE_SSL'] = True
          mail.init_app(app)

          app.config["SECRET_KEY"]="helloworld"
          app.config["SQLALCHEMY_DATABASE_URI"]= f'sqlite:///{DB_NAME}'
          db.init_app(app)
          @app.errorhandler(404)
          def not_found(e):
                    return render_template("404.html",
                            main_color=params["main_color"],
                                  page_heading="Page not Found",
                                  blog_name=params["blog_name"])

          from .views import views
          from .auth import auth
          from .posts import posts
          app.register_blueprint(views, url_prefix="/")
          app.register_blueprint(auth, url_prefix="/")
          app.register_blueprint(posts, url_prefix="/")
          from .models import Users

          create_database(app)
            
          
          login_manager= LoginManager()
          login_manager.login_view="auth.login"
          login_manager.init_app(app)

          @login_manager.user_loader
          def load_user(id):
                    return Users.query.get(int(id))

          return app

def create_database(app):
          if not path.exists("website/"+ DB_NAME):
            with app.app_context():
                  db.create_all()
                     
