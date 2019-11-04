from sqlalchemy import text

from src import db


class Quality(db.Model):
    """
    This class defines the quality table
    """

    __tablename__ = "quality"

    cid = db.Column(db.Integer, db.ForeignKey("course.cid"), primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey("user.id"), primary_key=True)
    rating = db.Column(db.Integer, nullable=False)  # 0 - 4

    __table_args__ = (db.UniqueConstraint("cid", "user_id", name="unique_quality"),)

    def __init__(self, cid, user_id, rating):
        self.cid = cid
        self.user_id = user_id
        self.rating = rating

    def update(self, rating):
        self.rating = rating
        self.save()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
