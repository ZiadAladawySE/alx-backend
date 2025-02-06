#!/usr/bin/env python3
"""basic Flask app"""
from flask import Flask, render_template
from flask_babel import Babel


class Config(object):
    """configure available languages"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def index():
    """basic Flask app"""
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run()
