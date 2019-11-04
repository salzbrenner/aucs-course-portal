from typing import Tuple
from flask import Blueprint, request, jsonify
from src.jwksutils.auth import authorize
from src.model.prereq import Prereq

prereqs = Blueprint("prereqs", __name__)


@prereqs.route("/prereq", methods=["POST"])
@authorize
def create() -> Tuple[str, int]:
    """
    :return:
    """
    params = request.form
    cid = params.get("cid")
    req_id: list = params.get("req_id")
    req_group = params.get("req_group")

    try:
        for id in req_id:
            print(id)
        # prereq = Prereq(cid, req_id, req_group)
        # prereq.save()
        # response = jsonify(message=f"Added a prereq for {cid}")
        # return response, 201

    except Exception as e:
        return jsonify(message=str(e)), 401


def add_prereq(prereqs, cid):
    prereq_array = []

    for l in prereqs:
        for c in prereqs[l].split():
            prereq_array.append([int(l), int(c)])

    for p in prereq_array:
        try:
            entry = Prereq(cid, p[1], p[0])
            entry.save()
        except Exception as e:
            return jsonify(message=str(e)), 401
