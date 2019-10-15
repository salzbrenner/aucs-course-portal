import os


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv("SECRET_KEY")
    SECRET_API_KEY = os.getenv("SECRET_API_KEY")
    # MAIL_SERVER = 'smtp.zoho.com'
    # MAIL_PORT = 587
    # MAIL_USE_TLS = True
    # MAIL_USERNAME = os.getenv('EMAIL_USER')
    # MAIL_PASSWORD = os.getenv('EMAIL_PASS')
    # MAIL_DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv("PRODUCTION_DATABASE_URL")


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL_TEST")
