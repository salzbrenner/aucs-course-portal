from typing import Tuple
from flask import Blueprint, request, jsonify
from src.model.prereq import Prereq

prereqs = Blueprint("prereqs", __name__)
