from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length, DataRequired


class TagForm(FlaskForm):
    tag = StringField("Tag", validators=[Length(max=35), DataRequired()])
