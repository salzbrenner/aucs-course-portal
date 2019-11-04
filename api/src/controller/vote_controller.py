from typing import Tuple

from flask import Blueprint, request, jsonify

from src.jwksutils.auth import authorize
from src.model.quality import Quality

votes = Blueprint("votes", __name__)


@votes.route("/vote", methods=["POST"])
@authorize
def vote() -> Tuple[str, int]:
    """
    Creates rows in various metric tables
    :return:
    """
    params = request.form
    cid = params.get("cid")
    user_id = params.get("id")
    quality = params.get("quality")

    try:
        quality = Quality(cid, user_id, quality)
        quality.save()
        response = jsonify(message="Successful vote")
        return response, 201

    except Exception as e:
        return jsonify(message=str(e)), 401
