from app.models import db, User, Notebook, environment, SCHEMA
import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo",
        last_name="User",
        email="demo@aa.io",
        password="password",
    )

    db.session.add(demo)
    db.session.commit()

    defaultNotebook = Notebook(
        user_id=1,
        name="First Notebook",
        default=True,
        created_at=datetime.datetime.now(datetime.timezone.utc),
    )

    db.session.add(defaultNotebook)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
