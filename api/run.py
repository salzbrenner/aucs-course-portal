import os
import instance.config
from src import create_app

app_settings = os.getenv("APP_SETTINGS")
app = create_app(config_name=getattr(instance.config, app_settings))


if __name__ == "__main__":
    # port needed for heroku!!
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port)
