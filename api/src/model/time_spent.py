from sqlalchemy.ext.declarative import declared_attr, declarative_base

from src import db
from src.model.rating import RatingBase


class TimeSpent(RatingBase):
    """
    This class defines the difficulty table
    """

    __table_args__ = {"extend_existing": True}
