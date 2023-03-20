from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateTimeField
from wtforms.validators import Length, DataRequired


class BreweryForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    address = StringField('Address', validators=[DataRequired(), Length(max=50)])
    city = StringField('City', validators=[DataRequired(), Length(max=20)])
    state = StringField('State', validators=[DataRequired(), Length(max=20)])
    country = StringField('Country', validators=[DataRequired(), Length(max=20)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(max=255)])
    event_image = StringField('Image')
    starts_at = DateTimeField('Starts At', validators=[DataRequired()])
    ends_at = DateTimeField('Ends At', validators=[DataRequired()])
