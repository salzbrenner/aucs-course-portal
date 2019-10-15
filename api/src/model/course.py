from sqlalchemy import PrimaryKeyConstraint

from src import db


class Course(db.Model):
    """
    This class defines the course table
    """

    __tablename__ = "course"

    cid = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String(256), nullable=False)
    description = db.Column(db.Text(), nullable=True)
    instructor = db.Column(db.String(256), nullable=False)

    # time = db.relationship("TimeCommitment", backref="course", lazy=True)
    # difficulty = db.relationship("Difficulty", backref="course", lazy=True)
    # quality = db.relationship("Quality", backref="course", lazy=True)

    def __init__(self, cid, name, instructor, description=""):
        self.cid = cid
        self.description = description
        self.instructor = instructor
        self.name = name

    def save(self):
        """
        Save course to database
        :return:
        """
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """
        Delete a course from db
        :return:
        """
        db.session.delete(self)
        db.session.commit()
