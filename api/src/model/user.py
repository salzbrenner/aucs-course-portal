from datetime import datetime
from src import db
from flask import current_app, session


class User(db.Model):
    """
    This class defines the users table
    """

    __tablename__ = "user"

    # internal_id = db.Column(db.Integer, primary_key=True)
    # sub from id.token claims from azure - used to identify user, and passed to client
    id = db.Column(db.Text, primary_key=True, unique=True)
    email = db.Column(db.String(256), unique=True)
    created_at = db.Column(db.DateTime, nullable=False)
    # 1 is admin, 2 is super admin
    role = db.Column(db.Integer, nullable=True)
    qualities = db.relationship("Quality", backref="user", lazy=True)
    difficulties = db.relationship("Difficulty", backref="user", lazy=True)
    time_spent = db.relationship("TimeSpent", backref="user", lazy=True)

    def __str__(self):
        votes = {}
        relationships = [
            {"label": "quality", "rel": self.qualities},
            {"label": "difficulty", "rel": self.difficulties},
            {"label": "time", "rel": self.time_spent},
        ]
        for r in relationships:
            for x in r.get("rel"):
                if votes.get(x.cid):
                    votes[x.cid] = {**votes[x.cid], r.get("label"): x.rating}
                else:
                    votes[x.cid] = {r.get("label"): x.rating}

        return {"id": self.id, "email": self.email, "role": self.role, "votes": votes}

    def __init__(self, id: str, email: str):
        """
        """
        self.id = id
        self.email = email
        self.created_at = datetime.now()
        self.role = 0

    def save(self):
        """
        Save user to DB (creation and updating).
        :return:
        """
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """
        Delete user from DB.
        :return:
        """
        relationships = [self.qualities, self.difficulties, self.time_spent]
        for rel in relationships:
            for i in rel:
                i.delete()

        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def save_user_session_id(id):
        """
        Sets the 'current_user' session id
        :param id: string
        :return:
        """
        try:
            session["current_user"] = id
            session.permanent = True
        except Exception as e:
            return e

    @staticmethod
    def get_user_session_id():
        """
        Gets session user id
        :return: id, string
        """
        try:
            return session["current_user"]
        except Exception as e:
            return e

    @staticmethod
    def clear_user_session_id():
        """
        Removes user id from session
        :return:
        """
        session.pop("current_user", None)
