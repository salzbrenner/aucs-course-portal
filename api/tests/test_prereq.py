from tests.conftest import auth_headers_for_admin
from tests.test_course import TestCourse


class TestPreReqs(object):
    def test_prereq_creation(self, auth_client):
        auth_client.post(
            "/api/courses",
            data=TestCourse.get_course_data(),
            headers=auth_headers_for_admin(auth_client.token),
        )
