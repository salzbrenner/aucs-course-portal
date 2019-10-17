from typing import Tuple
from flask import Blueprint, request, jsonify
from src.jwksutils.auth import authorize
from src.model.user import User

users = Blueprint("users", __name__)


@users.route("/user", methods=["POST"])
@authorize
def create() -> Tuple[str, int]:
    """
    create user
    :return: uid if created, or already exists, for client
    """
    data = request.json
    uid = data.get("uid")
    email = data.get("email")

    user = User.query.filter_by(uid=uid).first()

    if not user:
        try:
            user = User(uid, email)
            user.save()
            response = jsonify(message="User created", id=user.id, role=user.role)
            response.headers["location"] = f"user/{user.id}"
            return response, 201

        except Exception as e:
            response = jsonify(message=str(e))
            return response, 401

    else:
        response = jsonify(
            message="This user already exists.", id=user.id, role=user.role
        )
        return response, 422


@users.route("/user/<int:uid>", methods=["GET"])
@authorize
def get(uid) -> Tuple[str, int]:
    """
    get user by id
    :param uid:
    :return:
    """
    user = User.query.filter_by(id=uid).first()
    if user:
        return jsonify(user.__str__()), 200
    else:
        return "User not found", 404


@users.route("/user/<int:uid>", methods=["DELETE"])
@authorize
def delete(uid) -> Tuple[str, int]:
    """
    Delete a user
    :param uid:
    :return:
    """
    user = User.query.filter_by(id=uid).first()
    if user:
        user.delete()
        return "", 204
    else:
        return "User not found", 404
