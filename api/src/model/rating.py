from sqlalchemy.ext.declarative import declared_attr, declarative_base
from src import db


class RatingBase(db.Model):
    """
    This class is a base for the ratings tables
    """

    __abstract__ = True

    @declared_attr
    def __tablename__(self):
        return self.__name__.lower()

    @declared_attr
    def __table_args__(self):
        return (
            db.UniqueConstraint(
                "cid", "user_id", name=f"unique_{self.__name__.lower()}"
            ),
        )

    @declared_attr
    def cid(self):
        return db.Column(db.Integer, db.ForeignKey("course.cid"), primary_key=True)

    @declared_attr
    def user_id(self):
        return db.Column(db.String(256), db.ForeignKey("user.id"), primary_key=True)

    rating = db.Column(db.Integer, nullable=False)

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
