#!/usr/bin/env python

import time, json
from flask import Flask, request, jsonify
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS
from bluetooth import *
import threading

app = Flask(__name__)
CORS(app)
api = Api(app)

uuid = "83d5f5a0-1f48-11e8-b467-0ed5f89f718b"

data = []

class civilians(Resource):
    
    def __init__(self):
        super(civilians, self).__init__()

    def get(self):
        civilians_data = jsonify(data=data)
        print(civilians_data)
        return civilians_data

api.add_resource(civilians, '/')

class flask_thread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.daemon = True
        self.start()
        
    def run(self):
        app.run(host='0.0.0.0', threaded=True)

class bt_server_thread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.daemon = True
        self.start()
        
    def run(self):
        server_sock=BluetoothSocket(RFCOMM)
        server_sock.bind(("",PORT_ANY))
        server_sock.listen(1)

        port = server_sock.getsockname()[1]

        advertise_service( server_sock, "H4H_Raspberry_Pi",
                           service_id = uuid,
                           service_classes = [ uuid, SERIAL_PORT_CLASS ],
                           profiles = [ SERIAL_PORT_PROFILE ], 
                            )
        try:
            while True:
                print("Waiting for connection on RFCOMM channel %d" % port)
                client_sock, client_info = server_sock.accept()
                print("Accepted connection from ", client_info)

                try:
                    while True:
                        dat = client_sock.recv(1024)
                        if len(dat) == 0: break
                        print("received [%s]" % dat)
                        data.append(dat)
                except IOError:
                    pass

            print("Disconnecting from ", client_info)
            client_sock.close()
        except:
            server_sock.close()
            print("Closing server.")

if __name__ == '__main__':
    flaskapi = flask_thread()
    btserver = bt_server_thread()
    while True:
        time.sleep(1)