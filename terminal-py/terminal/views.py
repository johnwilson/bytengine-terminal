from terminal import app
from flask import request as req
from flask import render_template, abort, make_response
import json
import os
import requests

@app.route("/")
def index():
    return render_template('terminal.html')

@app.route("/bytengine/login", methods=["POST"])
def login():
    url = "http://{0}:{1}/bfs/prq/login".format(
        app.config["BYTENGINE_HOST"],
        app.config["BYTENGINE_PORT"]
    )
    
    if not "username" in req.form:
        uname = ""
    else:
        uname = req.form["username"]
    
    if not "password" in req.form:
        pw = ""
    else:
        pw = req.form["password"]
        
    data = {"username":uname,"password":pw}
    r = requests.post(url, data=data)
    if r.status_code != 200:
        resp = make_response(r.text, r.status_code)
        return resp
    else:
        return r.text

@app.route("/bytengine/docs/", methods=["GET"])
def commandlist():
    # get command list
    url = "http://{0}:{1}/static/commands/all.json".format(
        app.config["BYTENGINE_HOST"],
        app.config["BYTENGINE_PORT"]
    )
    r = requests.get(url)
    if r.status_code != 200:
        commandlist = "[]"
    else:
        commandlist = r.text
    
    return commandlist

@app.route("/bytengine/docs/<command>", methods=["GET"])
def commandhelp(command):
    url = "http://{0}:{1}/static/commands/{2}.html".format(
        app.config["BYTENGINE_HOST"],
        app.config["BYTENGINE_PORT"],
        command
    )
    r = requests.get(url)
    if r.status_code != 200:
        resp = make_response(r.text, r.status_code)
        return resp
    else:
        return r.text

@app.route("/bytengine/run", methods=["POST"])
def run():
    url = "http://{0}:{1}/bfs/prq/run".format(
        app.config["BYTENGINE_HOST"],
        app.config["BYTENGINE_PORT"]
    )
    
    if not "script" in req.form:
        script = ""
    else:
        script = req.form["script"]
    
    if not "ticket" in req.form:
        ticket = ""
    else:
        ticket = req.form["ticket"]
        
    data = {"ticket":ticket,"script":script}
    r = requests.post(url, data=data)
    if r.status_code != 200:
        resp = make_response(r.text, r.status_code)
        return resp
    else:
        return r.text




