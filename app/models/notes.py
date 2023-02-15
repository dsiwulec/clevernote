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
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")))
    title = db.Column(db.String(75))
    text = db.Column(db.Text())
    scratch = db.Column(db.Boolean(), default=False)
    bookmarked = db.Column(db.Boolean(), default=False)
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())

    user = db.relationship("User", back_populates="notes")
    notebook = db.relationship("Notebook", back_populates="notes")
    tag = db.relationship("Tag", back_populates="notes")

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
            "tagId": self.tag_id,
            "title": self.title,
            "text": self.text,
            "bookmarked": self.bookmarked,
            "scratch": self.scratch,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
