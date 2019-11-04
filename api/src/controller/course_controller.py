import json
from typing import Tuple, Any, Dict

from flask import Blueprint
from flask import request, jsonify
from sqlalchemy.exc import DataError, SQLAlchemyError

from src.controller.prereq_controller import add_prereq
from src.jwksutils.auth import authorize, admin_authorize
from src.model.course import Course
from src.model.prereq import Prereq
from src.model.quality import Quality

courses = Blueprint("course", __name__)


@courses.route("/course", methods=["POST"])
@authorize
@admin_authorize
def create() -> Tuple[str, int]:
    params = request.form
    name = params.get("name")
    cid = params.get("cid")
    instructor = params.get("instructor")
    description = params.get("description")
    prereqs = json.loads(params.get("prereqs"))

    course = Course.query.filter_by(cid=cid).first()

    if not course:
        try:
            course = Course(cid, name, instructor, description)
            course.save()

            add_prereq(prereqs, cid)

            response = jsonify(message=f"Created class {name} - {cid}")
            return response, 201

        except SQLAlchemyError as e:
            response = jsonify(message=str(e))
            return response, 401

    else:
        response = jsonify(message="This course already exists.")
        return response, 422


@courses.route("/course", methods=["GET"])
def get_all() -> Tuple[str, int]:
    """
    Gets all courses
    :return:
    """
    results = []
    courses = Course.query.all()

    for c in courses:
        results.append(set_course_json(c))

    return jsonify(results), 200


@courses.route("/course/<int:cid>")
def get(cid) -> Tuple[str, int]:
    """
    Get a course
    :param cid:
    :return:
    """
    course = Course.query.filter_by(cid=cid).first()

    if course:
        result = set_course_json(course)
        return jsonify(result), 200
    else:
        return "Course does not exist", 404


@courses.route("/course/<int:cid>", methods=["PUT"])
@authorize
@admin_authorize
def put(cid) -> Tuple[str, int]:
    """
    Update a course
    :param cid:
    :return:
    """
    params = request.form
    name = params.get("name")
    instructor = params.get("instructor")
    description = params.get("description")
    prereqs = json.loads(params.get("prereqs"))
    course = Course.query.filter_by(cid=cid).first()

    if course:
        try:
            # delete all prereqs so they can be added again
            p: Prereq
            for p in course.prereqs:
                p.delete()

            course.update(name, instructor, description)
            add_prereq(prereqs, cid)

            response = jsonify(message=f"Updated course {name} - {cid}")
            return response, 200

        except Exception as e:
            return "Could not process this update", 409

    else:
        return "Course does not exist", 404


@courses.route("/course/<int:cid>", methods=["DELETE"])
@authorize
@admin_authorize
def delete(cid) -> Tuple[str, int]:
    """
    Delete a course
    :param cid:
    :return:
    """
    course = Course.query.filter_by(cid=cid).first()

    if course:
        course.delete()
        return "Deleted course", 200
    else:
        return "Course does not exist", 404


@courses.route("/course/<int:cid>/<string:uid>", methods=["POST"])
@authorize
def vote_create(cid, uid) -> Tuple[str, int]:
    """
    Creates rows in various metric tables
    :return:
    """
    params = request.form
    quality = params.get("quality")
    print(cid, uid, quality)

    try:
        quality = Quality(cid, uid, quality)
        quality.save()
        response = jsonify(message="Successful vote")
        return response, 201

    except Exception as e:
        print(e)
        return jsonify(message=str(e)), 400


@courses.route("/course/<int:cid>/<string:uid>", methods=["PUT"])
@authorize
def vote_update(cid, uid) -> Tuple[str, int]:
    """
    Updates user's vote
    :param cid:
    :param uid:
    :return:
    """
    params = request.form
    quality = params.get("quality")

    quality_row = Quality.query.filter_by(cid=cid, user_id=uid).first()

    if quality_row:
        try:
            quality_row.update(quality)

        except Exception as e:
            return jsonify(message=str(e)), 400

    else:
        return "Cannot process this vote", 400

    response = jsonify(message="Successfully updated vote")
    return response, 200


@courses.route("/course/<int:cid>/<string:uid>", methods=["DELETE"])
@authorize
def vote_delete(cid, uid) -> Tuple[str, int]:
    """
    Updates user's vote
    :param cid:
    :param uid:
    :return:
    """

    quality_row = Quality.query.filter_by(cid=cid, user_id=uid).first()

    if quality_row:
        try:
            quality_row.delete()

        except Exception as e:
            return jsonify(message=str(e)), 400

    return "Deleted vote", 200


def set_course_json(course: Course) -> Dict[str, Any]:

    prereq_list = {}

    p: Prereq
    for p in course.prereqs:
        if prereq_list.get(p.req_group):
            prereq_list[p.req_group] = f"{prereq_list[p.req_group]} {p.req_id}"
        else:
            prereq_list[p.req_group] = f"{p.req_id}"

    qualities = get_quality_metrics(course)

    return {
        "cid": course.cid,
        "name": course.name,
        "description": course.description,
        "instructor": course.instructor,
        "prereq": prereq_list,
        "qualities": qualities,
    }


def get_quality_metrics(course: Course) -> Dict:

    total = 0
    occurences = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}

    q: Quality
    for q in course.quality:
        total += 1
        occurences[q.rating] += 1

    percentages = {}
    if total:
        percentages = {k: v / total for k, v in occurences.items()}

    return {"total": total, "occurences": occurences, "percentages": percentages}
