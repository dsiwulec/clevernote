from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length


class NotebookForm(FlaskForm):
    name = StringField("Name", validators=[Length(max=50), DataRequired()])
    default = BooleanField("Default")
