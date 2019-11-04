from sqlalchemy import PrimaryKeyConstraint

from src import db


class Prereq(db.Model):
    """
    This class defines the course table
    """

    __tablename__ = "prereq"

    cid = db.Column(db.Integer, db.ForeignKey("course.cid"), primary_key=True)
    req_id = db.Column(db.Integer, primary_key=True)
    req_group = db.Column(db.Integer, nullable=False)

    __table_args__ = (
        db.UniqueConstraint("cid", "req_id", "req_group", name="unique_prereq"),
    )

    def __init__(self, cid, req_id, req_group):
        self.cid = cid
        self.req_id = req_id
        self.req_group = req_group

    def save(self):
        """
        Save course to database
        :return:
        """
        db.session.add(self)
        db.session.commit()

    def update(self, cid, req_id, req_group):
        self.cid = cid
        self.req_id = req_id
        self.req_group = req_group
        self.save()

    def delete(self):
        """
        Delete a course from db
        :return:
        """
        db.session.delete(self)
        db.session.commit()
