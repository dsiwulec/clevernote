from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class Note(db.Model):
    __tablename__ = "notes"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    notebook_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id"))
    )
    title = db.Column(db.String(75))
    text = db.Column(db.Text())
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())

    user = db.relationship("User", back_populates="notes")
    notebook = db.relationship("Notebook", back_populates="notes")

    def set_created(self):
        self.created_at = datetime.datetime.now(datetime.timezone.utc)

    def set_updated(self):
        self.updated_at = datetime.datetime.now(datetime.timezone.utc)

    def to_dict(self):
        """
        Converts class data into a dictionary for use in api routes
        """
        return {
            "id": self.id,
            "userId": self.user_id,
            "notebookId": self.notebook_id,
            "title": self.title,
            "text": self.text,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }


# from sqlalchemy import func


# created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
# updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
