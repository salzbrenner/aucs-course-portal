from sqlalchemy.ext.declarative import declared_attr

from src import db
from src.model.rating import RatingBase


class Quality(RatingBase):
    """
    This class defines the quality table
    """

    __table_args__ = {"extend_existing": True}
