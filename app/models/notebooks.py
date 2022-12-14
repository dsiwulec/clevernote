from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class Notebook(db.Model):
    __tablename__ = "notebooks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(50), nullable=False)
    default = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())

    user = db.relationship("User", back_populates="notebooks")
    notes = db.relationship(
        "Note", back_populates="notebook", cascade="all, delete-orphan"
    )

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
            "name": self.name,
            "default": self.default,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
