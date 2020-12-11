from flask import Flask, request, jsonify, make_response #session
import requests, json, math
from backend import do
from backend import do2
from backend import reverse_geocode
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# mongo stuff
from pymongo import MongoClient
client = MongoClient("mongodb+srv://Jason:sushila44@cluster0.iq2bk.mongodb.net/WonderPath-User-DB?retryWrites=true&w=majority")
db = client.get_database('WonderPath-User-DB')
users = db.users

# cors stuff
def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

    
def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# routes -> general
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

@app.route("/get-steps-modal", methods=['GET', 'POST'])
def get_steps_modal():
    dat = request.get_json(silent=True)

    # both are lat and lngs
    loc1 = dat["curr_location"]
    loc2 = dat["curr_destination"]
    out_json = do2(loc1, loc2)
    return _corsify_actual_response(jsonify(out_json))


@app.route("/sui", methods=['GET', 'POST'])
def send_user_info():
    dat = request.get_json(silent=True)
    out_json = dict(dat)
    users.insert_one(dat) # mongo stuff in dicts no special stuff needed
    return _corsify_actual_response(jsonify(out_json))


@app.route("/savepath", methods=['GET', 'POST'])
def save_path():
    dat = request.get_json(silent=True)
    out_json = dict(dat)
    already_saved_paths = users.find_one({'email': dat['email']})
    dat['coors']['origin'] = reverse_geocode(dat['coors']['lat_a'], dat['coors']['lng_a'])
    dat['coors']['destination'] = reverse_geocode(dat['coors']['lat_b'], dat['coors']['lng_b'])
    if dat['coors'] not in already_saved_paths['savedpaths']:
        users.update({'email': dat['email']}, { '$addToSet': {'savedpaths' : dat['coors']}})
    return _corsify_actual_response(jsonify(out_json))


@app.route("/loaduser", methods=['GET', 'POST'])
def load_user():
    dat = request.get_json(silent=True)
    out_json = users.find_one({'email': dat['email']})
    del out_json['_id']
    return _corsify_actual_response(jsonify(out_json))


@app.route("/deletepath", methods=['GET', 'POST', 'PUT'])
def delete_path():
    dat = request.get_json(silent=True)
    users.update({'email': dat['email']}, { '$pull': {'savedpaths' : dat['info']}})
    out_json = users.find_one({'email': dat['email']})
    del out_json['_id']

    return _corsify_actual_response(jsonify(out_json))


@app.route("/savephotourl", methods=['GET', 'POST', 'PUT'])
def save_photo():
    dat = request.get_json(silent=True)
    users.update_one({'email': dat['email']}, {'$set': { 'profile_photo_url': dat['profile_photo_url']}})
    users.update_one({'email': dat['email']}, {'$set': { 'profile_photo_id': dat['profile_photo_id']}})
    out_json = users.find_one({'email': dat['email']})
    del out_json['_id']
    return _corsify_actual_response(jsonify(out_json))



if __name__ == "__main__":
    app.run()