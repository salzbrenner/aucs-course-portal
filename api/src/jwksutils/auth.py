import os
from functools import wraps

import jwt
import requests
from flask import request, redirect, url_for, abort, current_app
from requests import HTTPError

from src.jwksutils import rsa_pem_from_jwk

valid_audiences = ["c022a64b-aeb7-4b48-992c-a00b9956813b"]
issuer = "https://login.microsoftonline.com/ccb6deed-bd29-4b38-8979-d72780f62d3b/v2.0"


INVALID_JWT_MESSAGE = "invalid jwt"  # don't change this unless updating client too


class InvalidAuthorizationToken(Exception):
    def __init__(self, details):
        super().__init__("Invalid authorization token: " + details)


def get_kid(token):
    headers = jwt.get_unverified_header(token)
    if not headers:
        raise InvalidAuthorizationToken("missing headers")
    try:
        return headers["kid"]
    except KeyError:
        raise InvalidAuthorizationToken("missing kid")


def get_jwk(kid):
    try:
        response = requests.get(
            f"https://login.microsoftonline.com/{os.getenv('AZURE_AU_TENANT_ID')}/discovery/keys"
        )
        # If the response was successful, no Exception will be raised
        response.raise_for_status()

        for jwk in response.json().get("keys"):
            if jwk.get("kid") == kid:
                return jwk
        raise InvalidAuthorizationToken("kid not recognized")

    except HTTPError as http_err:
        raise HTTPError(http_err)
    except Exception as err:
        raise Exception(err)


def get_public_key(token):
    return rsa_pem_from_jwk(get_jwk(get_kid(token)))


def validate_jwt(jwt_to_validate):
    public_key = get_public_key(jwt_to_validate)

    jwt.decode(
        jwt_to_validate,
        public_key,
        verify=True,
        algorithms=["RS256"],
        audience=valid_audiences,
        issuer=issuer,
    )


def authorize(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):

        if not "Authorization" in request.headers:
            abort(401)

        data = request.headers["Authorization"]
        token = str.replace(str(data), "Bearer ", "")

        if current_app.config["TESTING"]:
            if os.getenv("TEST_TOKEN") == token:
                return f(*args, **kwargs)
            else:
                # don't change message from
                return INVALID_JWT_MESSAGE, 401

        try:
            validate_jwt(token)

        except:
            return INVALID_JWT_MESSAGE, 401

        return f(*args, **kwargs)

    return decorated_function


def admin_authorize(f):
    @wraps(f)
    def admin_check(*args, **kwargs):
        if not "x-app-admin" in request.headers:
            abort(401)

        role = request.headers["x-app-admin"]

        if int(role) == 0:
            return "Not an Admin", 401

        return f(*args, **kwargs)

    return admin_check
