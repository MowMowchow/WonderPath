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
def hello():
    out_json = do()
    return _corsify_actual_response(jsonify(out_json))


if __name__ == "__main__":
    app.run()   