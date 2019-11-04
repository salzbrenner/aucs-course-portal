from typing import Dict

import pytest
import instance.config
import os
from src import db

from src import create_app

app_settings = os.getenv("TEST_SETTINGS")
app = create_app(config_name=getattr(instance.config, app_settings))


@pytest.fixture(scope="class")
def client():
    c = app.test_client()
    with app.app_context():
        db.create_all()
        yield c
        db.session.close()
        db.drop_all()


@pytest.fixture(scope="class")
def auth_client():
    c = app.test_client()
    with app.app_context():
        db.create_all()
        c.token = os.getenv("TEST_TOKEN")
        yield c
        db.session.close()
        db.drop_all()


def bearer_header(token) -> {}:
    return {"Authorization": "Bearer " + token}


def auth_headers(token):
    return {**bearer_header(token), "content-type": "application/json"}


def auth_headers_for_forms(token):
    return {**bearer_header(token), "content-type": "application/x-www-form-urlencoded"}


def auth_headers_for_admin(token):
    return {**auth_headers_for_forms(token), "x-app-admin": 1}


def default_user() -> Dict:
    return {"id": "sodifjosijdf", "email": "dude@test.com"}
