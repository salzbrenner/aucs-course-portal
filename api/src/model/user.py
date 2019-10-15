from datetime import datetime
from src import db
from flask import current_app, session


class User(db.Model):
    """
    This class defines the users table
    """

    __tablename__ = "user"

    # Define the columns of the users table, starting with the primary key
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(256), nullable=False, unique=True)
    email = db.Column(db.String(256), unique=True)
    created_at = db.Column(db.DateTime, nullable=False)
    # 1 is admin, 2 is super admin
    role = db.Column(db.Integer, nullable=True)

    def __str__(self):
        return {"id": self.id, "uid": self.uid, "email": self.email, "role": self.role}

    def __init__(self, uid: str, email: str):
        """
        Initialize the user with an email and password
        :param email: string
        :param password: string
        """
        self.uid = uid
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
    def save_user_session_id(uid):
        """
        Sets the 'current_user' session id
        :param uid: string
        :return:
        """
        try:
            session["current_user"] = uid
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
