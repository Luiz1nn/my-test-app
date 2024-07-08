from flask import Flask
import os
from flask_cors import CORS
from utils.db import init_db
from controllers import pdf_controller
import os

app = Flask(__name__)
CORS(app)

if not os.path.exists('uploads'):
    os.makedirs('uploads')

init_db()

app.register_blueprint(pdf_controller.bp)
