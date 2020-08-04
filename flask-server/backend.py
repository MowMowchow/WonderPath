import requests, json, math
api_key = "AIzaSyBTcJcpE8loo8Hmel4kVw5hXa8VOv2FLoo"
addy = "3915 Tacc Drive, Mississauga, Ontario"


def get_coor(): # is not precise
    base_url = "https://www.googleapis.com/geolocation/v1/geolocate?key="
    r = requests.post(base_url+api_key).json()
    return r["location"]


def get_coor_addy(address):
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    endpoint = f"{base_url}?address={address}&key={api_key}"
    r = requests.get(endpoint).json()
    return r['results'][0]['geometry']['location']


def find_dest_coor(lat, lon, distance, bearing):
    brng = (bearing*math.pi)/180  # Bearing is 90 degrees converted to radians.
    d = distance # Distance in km

    lat1 = math.radians(lat)  # Current lat point converted to radians
    lon1 = math.radians(lon)  # Current long point converted to radians

    lat2 = math.asin(math.sin(lat1)*math.cos(d/6378.1) +
         math.cos(lat1)*math.sin(d/6378.1)*math.cos(brng))

    lon2 = lon1 + math.atan2(math.sin(brng)*math.sin(d/6378.1)*math.cos(lat1),
                 math.cos(d/6378.1)-math.sin(lat1)*math.sin(lat2))

    lat2 = math.degrees(lat2)
    lon2 = math.degrees(lon2)

    return lat2, lon2


def get_dist_gm(lat1, lon1, lat2, lon2):
    coor1 = str(lat1)+','+str(lon1)
    coor2 = str(lat2)+','+str(lon2)

    base_url = "https://maps.googleapis.com/maps/api/distancematrix/json?"
    origins = coor1.replace(' ', '+')
    destinations = coor2.replace(' ', '+')
    # Building the URL for the request
    nav_request = 'origins={}&destinations={}&mode={}&key={}'.format(origins, destinations, 'walking', api_key)
    endpoint = base_url + nav_request
    r = requests.get(endpoint).json()
    return [r['rows'][0]['elements'][0]['distance']['text'], r['rows'][0]['elements'][0]['duration']['text']]


def get_legs(lat1, lon1, lat2, lon2):
    coor1 = str(lat1)+','+str(lon1)
    coor2 = str(lat2)+','+str(lon2)

    base_url = 'https://maps.googleapis.com/maps/api/directions/json?'
    origin = coor1.replace(' ', '+')
    destination = coor2.replace(' ', '+')
    # Building the URL for the request
    nav_request = 'origin={}&destination={}&mode={}&key={}'.format(origin, destination, 'walking', api_key)
    endpoint = base_url + nav_request
    # Sends the request and reads the response.
    r = requests.get(endpoint).json()
    return r['routes'][0]['legs'][0]

    
def get_instruc(leg):
    # [step['end_location']['lat'], step['end_location']['lng']]
    # ^gets the coordinates at each step
    instruc = [[leg['start_location']['lat'], leg['start_location']['lng']]]
    bad_chars = '<b></b>'
    for step in leg['steps']:
        skip = False
        curr = ""
        for char in step['html_instructions']:
            if char == '<':
                skip = True
            if not skip:
                curr += char
            if char == '>':
                skip = False
                curr += " "

        instruc.append(curr)

    return instruc[1:]


def do():
    curr_coor = get_coor_addy(addy)
    dest_coor = find_dest_coor(curr_coor['lat'], curr_coor['lng'], 2, 0)
    leg_there = get_legs(curr_coor['lat'], curr_coor['lng'], dest_coor[0], dest_coor[1])
    leg_back = get_legs(dest_coor[0], dest_coor[1], curr_coor['lat'], curr_coor['lng'])
    instruc_there = get_instruc(leg_there)
    instruc_back = get_instruc(leg_back)
    dist_time_there = get_dist_gm(curr_coor['lat'], curr_coor['lng'], dest_coor[0], dest_coor[1])
    out_json = {
        'instruc_there': instruc_there,
        'instruc_back': instruc_back,
        'distance': dist_time_there[0],
        'time': dist_time_there[1],
    }
    
    # to get json for page:
    # out_json = do()
    # return out_json

    return out_json
