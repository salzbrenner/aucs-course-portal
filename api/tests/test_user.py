from tests.conftest import auth_headers


class TestUser(object):
    @staticmethod
    def get_user_data():
        return {"uid": "1", "email": "dude@test.com"}

    def test_user_creation(self, auth_client):
        """
        Test a new user is created
        :return:
        """
        res = auth_client.post(
            "/api/user",
            json=self.get_user_data(),
            headers=auth_headers(auth_client.token),
        )
        assert "User created" in res.json.get("message")
        assert res.status_code == 201

    def test_same_user_creation(self, auth_client):
        """
        Test a user cannot be created more than once
        :return:
        """
        res = auth_client.post(
            "/api/user",
            json=self.get_user_data(),
            headers=auth_headers(auth_client.token),
        )
        assert "already exists" in res.json.get("message")
        assert res.status_code == 422

    def test_get_user(self, auth_client):
        """
        Test can get a client by db id
        :param auth_client:
        :return:
        """
        res = auth_client.get(
            f"/api/user/{self.get_user_data().get('uid')}",
            headers=auth_headers(auth_client.token),
        )
        assert res.status_code == 200

    def test_delete_user(self, auth_client):
        """
        Test can delete a user
        :param client:
        :return:
        """
        res = auth_client.delete(
            f"/api/user/{self.get_user_data().get('uid')}",
            headers=auth_headers(auth_client.token),
        )
        assert res.status_code == 204

        res2 = auth_client.get(
            f"/api/user/{self.get_user_data().get('uid')}",
            headers=auth_headers(auth_client.token),
        )
        assert res2.status_code == 404
