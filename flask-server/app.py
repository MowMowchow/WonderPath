from flask import Flask, request, jsonify, make_response
import requests, json, math
from backend import do
app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def hello():
    out_json = do()
    return 'hi!'


if __name__ == "__main__":
    app.run()