from flask import Flask, request, jsonify, make_response
import requests, json, math
from backend import do
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

    
def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/", methods=['GET', 'POST'])
def send_data():
    temp1 = "3915 Tacc Drive, Mississauga, Ontario"
    temp2 = 2
    out_json = do(temp1, temp2)
    return _corsify_actual_response(jsonify(out_json))


@app.route("/get-steps", methods=['GET', 'POST'])
def get_steps():
    dat = request.get_json(silent=True)
    loc = dat["curr_location"]
    dist = float(dat["curr_distance"])
    out_json = do(loc, dist)
    return _corsify_actual_response(jsonify(out_json))

if __name__ == "__main__":
    app.run()   