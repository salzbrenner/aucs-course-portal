from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

db = SQLAlchemy()

template_dir = os.path.dirname(
    os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
)
template_dir = os.path.join(template_dir, "templates")


def create_app(config_name):
    app = Flask(__name__)
    # Middleware
    app.config.from_object(config_name)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(
        app,
        resources={r"/api/*": {"origins": ["http://localhost:3000"]}},
        supports_credentials=True,
    )

    db.init_app(app)

    from src.controller.course_controller import courses
    from src.controller.user_controller import users
    from src.controller.prereq_controller import prereqs

    app.register_blueprint(courses, url_prefix="/api")
    app.register_blueprint(users, url_prefix="/api")
    app.register_blueprint(prereqs, url_prefix="/api")

    return app
