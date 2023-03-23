from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        subject = '',
        body = '',
        user_id = 1,
        event_id = 1
    )
    review2 = Review(
        subject = '',
        body = '',
        user_id = 2,
        event_id = 2
    )
    review3 = Review(
        subject = '',
        body = '',
        user_id = 3,
        event_id = 3
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
