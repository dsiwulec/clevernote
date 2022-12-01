from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import Length, Optional


class NoteForm(FlaskForm):
    notebookId = IntegerField("Notebook ID")
    title = StringField("Title", validators=[Length(max=35), Optional()])
    text = TextAreaField("Text")
