from typing import Tuple
from flask import Blueprint, request, jsonify
from sqlalchemy.exc import DataError, SQLAlchemyError

from src.jwksutils.auth import authorize
from src.model.user import User

users = Blueprint("users", __name__)


@users.route("/user", methods=["POST"])
@authorize
def create() -> Tuple[str, int]:
    """
    create user
    :return:
    """
    data = request.json
    id = data.get("id")
    email = data.get("email")

    user = User.query.filter_by(id=id).first()

    if not user:
        try:
            user = User(id, email)
            user.save()
            response = jsonify(message="User created")
            response.headers["location"] = f"user/{user.id}"
            return response, 201

        except Exception as e:
            response = jsonify(message=str(e))
            return response, 401

    else:
        response = jsonify(message="This user already exists.")
        return response, 422


@users.route("/user/<string:id>", methods=["GET"])
@authorize
def get(id) -> Tuple[str, int]:
    """
    get user by id
    :param id:
    :return:
    """
    user = User.query.filter_by(id=id).first()

    if user:
        try:
            user = User.query.filter_by(id=id).first()
            return jsonify(user.__str__()), 200

        except SQLAlchemyError as e:
            response = jsonify(message=str(e))
            return response, 401
    else:
        return "This user does not exist", 404


@users.route("/user/<string:id>", methods=["DELETE"])
@authorize
def delete(id) -> Tuple[str, int]:
    """
    Delete a user
    :param id:
    :return:
    """
    user = User.query.filter_by(id=id).first()
    if user:
        user.delete()
        return "Deleted user", 200
    else:
        return "User not found", 404
