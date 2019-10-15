from flask import current_app


class TestCourse(object):
    @staticmethod
    def get_course_data():
        return {
            "name": "Test Course",
            "cid": 666,
            "instructor": "Seinfeld",
            "description": "<h1>This is a test</h1>",
        }

    def test_course_creation(self, client):
        """
        Test a user can create a new course
        :return:
        """
        res = client.post(
            "/api/courses",
            data=self.get_course_data(),
            headers={"content-type": "application/x-www-form-urlencoded"},
        )
        assert "666" in res.json.get("message")
        assert res.status_code == 201

    def test_same_course_creation(self, client):
        """
        Test a user can create a new course
        :return:
        """
        res = client.post(
            "/api/courses",
            data=self.get_course_data(),
            headers={"content-type": "application/x-www-form-urlencoded"},
        )
        assert "already exists" in res.json.get("message")
        assert res.status_code == 422

    def test_get_all(self, client):
        client.post(
            "/api/courses",
            data={"name": "Another Course", "cid": 1234, "instructor": ""},
            headers={"content-type": "application/x-www-form-urlencoded"},
        )
        res = client.get("/api/courses")
        assert len(res.json) == 2

    def test_get_course(self, client):
        res = client.get("/api/courses/666")
        assert res.status_code == 200

    def test_delete_course(self, client):
        res = client.delete("/api/courses/666")
        assert res.status_code == 204

        res = client.get("/api/courses/666")
        assert res.status_code == 404
