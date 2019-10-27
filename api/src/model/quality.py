from src import db


class Quality(db.Model):
    """
    This class defines the quality table
    """

    __tablename__ = "quality"

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("course.cid"))
    poor = db.Column(db.Integer)
    fair = db.Column(db.Integer)
    average = db.Column(db.Integer)
    good = db.Column(db.Integer)
    excellent = db.Column(db.Integer)

    def __init__(self, course_id):
        self.course_id = course_id

    def save(self):
        db.session.add(self)
        db.session.commit()
