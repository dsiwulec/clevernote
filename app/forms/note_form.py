from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import Length, Optional


class NoteForm(FlaskForm):
    title = StringField("Title", validators=[Length(max=75), Optional()])
    text = TextAreaField("Text", validators=[Length(max=1000), Optional()])
