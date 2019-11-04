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
    id = db.Column(db.String(256), primary_key=True, unique=True)
    email = db.Column(db.String(256), unique=True)
    created_at = db.Column(db.DateTime, nullable=False)
    # 1 is admin, 2 is super admin
    role = db.Column(db.Integer, nullable=True)
    qualities = db.relationship("Quality", backref="user", lazy=True)

    def __str__(self):
        votes = {}
        for q in self.qualities:
            votes[q.cid] = {"quality": q.rating}

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

    # @staticmethod
    # def generate_token(user_id, minutes=50):
    #     """
    #     Creates access token
    #     :param user_id: number
    #     :param minutes: number
    #     :return: string, encoded jwt
    #     """
    #     try:
    #         # create payload with expiration
    #         payload = {
    #             'iat': datetime.utcnow(),
    #             'exp': datetime.utcnow() + timedelta(minutes=minutes),
    #             'sub': str(user_id),
    #         }
    #
    #         return jwt.encode(payload,
    #                           current_app.config.get('SECRET_API_KEY'),
    #                           algorithm='HS256')
    #     except Exception as e:
    #         return str(e)

    # @staticmethod
    # def decode_token(token):
    #     """
    #     Decodes access token from authorization header
    #     :param token: string
    #     :return:
    #     """
    #     try:
    #         return jwt.decode(token, current_app.config.get('SECRET_API_KEY'), algorithms=['HS256'])
    #     except jwt.ExpiredSignatureError:
    #         raise Exception('Expired token')
    #     except jwt.InvalidTokenError:
    #         raise Exception('Invalid token')
