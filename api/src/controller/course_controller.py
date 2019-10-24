from typing import Tuple, Any, Dict

from flask import Blueprint
from flask import request, jsonify
from sqlalchemy.exc import DataError

from src.jwksutils.auth import authorize
from src.model.course import Course

courses = Blueprint("course", __name__)


@courses.route("/course", methods=["POST"])
def create() -> Tuple[str, int]:
    params = request.form
    name = params.get("name")
    cid = params.get("cid")
    instructor = params.get("instructor")
    description = params.get("description")

    course = Course.query.filter_by(cid=cid).first()

    if not course:
        try:
            course = Course(cid, name, instructor, description)
            course.save()
            response = jsonify(message=f"Created class {name} - {cid}")
            return response, 201

        except DataError as e:
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

    course = Course.query.filter_by(cid=cid).first()

    if course:
        try:
            course.update(name, instructor, description)
            response = jsonify(message=f"Updated course {name} - {cid}")
            return response, 204

        except Exception as e:
            return "Could not process this update", 409

    else:
        return "Course does not exist", 404


@courses.route("/course/<int:cid>", methods=["DELETE"])
def delete(cid) -> Tuple[str, int]:
    """
    Delete a course
    :param cid:
    :return:
    """
    course = Course.query.filter_by(cid=cid).first()

    if course:
        course.delete()
        return "", 204
    else:
        return "Course does not exist", 404


def set_course_json(course: Course) -> Dict[str, Any]:
    return {
        "cid": course.cid,
        "name": course.name,
        "description": course.description,
        "instructor": course.instructor,
    }
