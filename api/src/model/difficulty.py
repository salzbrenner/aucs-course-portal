from sqlalchemy.ext.declarative import declared_attr

from src import db
from src.model.rating import RatingBase


class Difficulty(RatingBase):
    """
    This class defines the difficulty table
    """

    __table_args__ = {"extend_existing": True}
