from flask import current_app, jsonify

from tests.conftest import (
    auth_headers_for_admin,
    default_user,
    auth_headers,
    auth_headers_for_forms,
)
from tests.test_user import TestUser


class TestCourse(object):
    @staticmethod
    def get_course_data():
        return {
            "name": "Test Course",
            "cid": 666,
            "instructor": "Seinfeld",
            "description": "<h1>This is a test</h1>",
            "prereqs": '{"0": "44 55", "1": "222 66"}',
        }

    @staticmethod
    def get_course_metrics():
        return {"quality": 3}

    @staticmethod
    def get_updated_course_metrics():
        return {"quality": 4}

    def test_setup(self, auth_client):
        # create a user
        #  so they can vote
        res = auth_client.post(
            "/api/user", json=default_user(), headers=auth_headers(auth_client.token)
        )
        assert res.status_code == 201
        assert "User created" in res.json.get("message")

    def test_course_creation(self, auth_client):
        """
        Test a user can create a new course
        :return:
        """
        res = auth_client.post(
            "/api/course",
            data=self.get_course_data(),
            headers=auth_headers_for_admin(auth_client.token),
        )
        assert res.status_code == 201
        assert "666" in res.json.get("message")

    def test_same_course_creation(self, auth_client):
        """
        Test a user can create a new course
        :return:
        """
        res = auth_client.post(
            "/api/course",
            data=self.get_course_data(),
            headers=auth_headers_for_admin(auth_client.token),
        )
        assert "already exists" in res.json.get("message")
        assert res.status_code == 422

    def test_get_all(self, auth_client):
        auth_client.post(
            "/api/course",
            data={
                "name": "Another Course",
                "cid": 1234,
                "instructor": "",
                "prereqs": '{"0": "33", "1": "87"}',
            },
            headers=auth_headers_for_admin(auth_client.token),
        )
        res = auth_client.get("/api/course")
        assert len(res.json) == 2

    def test_get_course(self, auth_client):
        res = auth_client.get("/api/course/666")
        assert res.status_code == 200

    def test_vote_course(self, auth_client):
        res = auth_client.post(
            f"api/course/666/{default_user().get('id')}",
            data=self.get_course_metrics(),
            headers=auth_headers_for_forms(auth_client.token),
        )
        assert res.status_code == 201

    def test_vote_update(self, auth_client):
        res = auth_client.put(
            f"api/course/666/{default_user().get('id')}",
            data=self.get_updated_course_metrics(),
            headers=auth_headers_for_forms(auth_client.token),
        )
        assert res.status_code == 200

    def test_vote_delete(self, auth_client):
        res = auth_client.delete(
            f"api/course/666/{default_user().get('id')}",
            headers=auth_headers(auth_client.token),
        )
        assert res.status_code == 200

    def test_delete_course(self, auth_client):
        res = auth_client.delete(
            "/api/course/666", headers=auth_headers_for_admin(auth_client.token)
        )
        assert res.status_code == 200

        res = auth_client.get("/api/course/666")
        assert res.status_code == 404
