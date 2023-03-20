from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange


class ReviewForm(FlaskForm):
    subject = StringField('Subject', validators=[DataRequired(), Length(max=255)])
    body = StringField('Body', validators=[DataRequired(), Length(max=1000)])
