import os
import instance.config
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from src import db, create_app
import pytest

# $ flask db stamp head
# $ flask db migrate
# $ flask db upgrade

app_settings = os.getenv("APP_SETTINGS")
app = create_app(config_name=getattr(instance.config, app_settings))
migrate = Migrate(app, db)
# create instance of class to handle commands
manager = Manager(app)

# migration command will always be preceeded by "db"
manager.add_command("db", MigrateCommand)


# define testing command
# usage: python manage.py test
@manager.command
def test():
    pytest.main(["-sx", "--durations=3", "tests"])


if __name__ == "__main__":
    manager.run()


