#!/usr/bin/env python

# lat:37.3541
# long:-121.9552

import time, json
from flask import Flask, request, jsonify
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)
# api = Api(app)

app = Flask(__name__, static_url_path="")
CORS(app)
api = Api(app)

data = [{"firstName":"Zach","lastName":"Bellay","numPeople":"1","emergencyLevel":"2","fire":"false","flood":"false","earthquake":"true","trapped":"false","child":"true","injury":"false","disability":"false","elderly":"false","time":"1520153541","latitude":"37.3542","longitude":"-121.9551"},{"firstName":"Dan","lastName":"Barkhorn","numPeople":"4","emergencyLevel":"1","fire":"true","flood":"false","earthquake":"true","trapped":"false","child":"true","injury":"false","disability":"false","elderly":"false","time":"1520143541","latitude":"37.3539","longitude":"-121.9552"},{"firstName":"Sam","lastName":"Song","numPeople":"10","emergencyLevel":"2","fire":"false","flood":"false","earthquake":"true","trapped":"false","child":"true","injury":"false","disability":"false","elderly":"false","time":"1520131541","latitude":"37.3545","longitude":"-121.9550"},{"firstName":"Anthony","lastName":"Fenzl","numPeople":"4","emergencyLevel":"2","fire":"false","flood":"false","earthquake":"false","trapped":"false","child":"false","injury":"false","disability":"false","elderly":"false","time":"1520158941","latitude":"37.3544","longitude":"-121.9550"}]
orgs = [{"orgName":"U.S. National Guard","numPeople":"198","time":"1520153541","latitude":"37.3532","longitude":"-121.9551"},{"orgName":"SCPD","numPeople":"12","time":"1520153541","latitude":"37.3542","longitude":"-121.9549"},{"orgName":"FEMA","numPeople":"18","time":"1520153541","latitude":"37.3546","longitude":"-121.9546"},{"orgName":"U.S. Coast Guard","numPeople":"95","time":"1520153541","latitude":"37.3542","longitude":"-121.9551"}]

class location(Resource):
    
    def get(self):
        location_data = jsonify(data=data)
        print(location_data)
        return location_data

class orgs_location(Resource):
    
    def get(self):
        orgs_location_data = jsonify(data=orgs)
        print(orgs_location_data)
        return orgs_location_data


api.add_resource(location, '/api/loc')
api.add_resource(orgs_location, '/api/orgs')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=55555, threaded=True)