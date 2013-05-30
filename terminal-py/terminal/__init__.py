from flask import Flask, render_template

# application settings
BYTENGINE_HOST = "www.bytengine.com"
BYTENGINE_PORT = 80

app = Flask(__name__)
app.config.from_object(__name__)

import terminal.views

