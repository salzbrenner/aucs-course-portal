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
    position = db.Column(db.Integer)

    quality = db.relationship("Quality", backref="course", lazy=True)
    difficulties = db.relationship("Difficulty", backref="course", lazy=True)
    time_spent = db.relationship("TimeSpent", backref="course", lazy=True)
    prereqs = db.relationship("Prereq", backref="course", lazy=True)

    def __init__(self, cid, name, instructor, position, description=""):
        self.cid = cid
        self.description = description
        self.instructor = instructor
        self.name = name
        self.position = position

    def update(self, name, instructor, position, description):
        self.name = name
        self.instructor = instructor
        self.description = description
        self.position = position
        self.save()

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
        relationships = [self.prereqs, self.quality, self.difficulties, self.time_spent]
        for rel in relationships:
            for i in rel:
                i.delete()

        db.session.delete(self)
        db.session.commit()
