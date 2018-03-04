from bluetooth import *

server_sock=BluetoothSocket( RFCOMM )
server_sock.bind(("",PORT_ANY))
server_sock.listen(1)

port = server_sock.getsockname()[1]

uuid = "83d5f5a0-1f48-11e8-b467-0ed5f89f718b"

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
		        data = client_sock.recv(1024)
		        if len(data) == 0: break
		        print("received [%s]" % data)
		except IOError:
		    pass

		print("Disconnecting from ", client_info)
		client_sock.close()
except:
	server_sock.close()
	print("Closing server.")