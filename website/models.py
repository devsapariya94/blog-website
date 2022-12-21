from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Users(db.Model, UserMixin):
        id= db.Column(db.Integer, primary_key=True)
        username=db.Column(db.String(150), unique=True)
        email=db.Column(db.String(150), unique=True)
        password=db.Column(db.String(150))
        date_created=db.Column(db.DateTime(timezone=True), default=func.now())

class Post(db.Model):
        id= db.Column(db.Integer, primary_key=True)
        title=db.Column(db.String(50), unique=True)
        subtitle=db.Column(db.String(150), unique=True)
        slug=db.Column(db.String(150), unique=True)
        body=db.Column(db.Text)
        author=db.Column(db.String(20))
        date_created=db.Column(db.DateTime(timezone=True), default=func.now())