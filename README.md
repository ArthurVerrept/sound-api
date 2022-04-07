## Hedy Sound Wearable API

This project is made to connect Hedy's wearable device to a web front end it uses OSC messages passed over UDP to receive data from the arduino, before sending them over websockets to the front end. It also saves & deletes audio files and serves them to the front end. This project is designed to be built into an executable using pkg. 

<i>If developing this further please read the "create an executable" section at the bottom.</i>

### Main packages used:

1. [Epress JS](https://expressjs.com/)
2. [Socket.io](https://socket.io/)
2. [osc-js](https://www.npmjs.com/package/osc-js)

## For development with Arduino
Router:
1. Connect to router and navigate to <a>www.tplinkwifi.net</a>
2. Ask Hedy for code to log into router admin settings
3. On your mac, open a terminal and use the <i>ifconfig</i> command to get your mac address on the router (it should look like this: 88:e9:fe:4e:aa:7b)
4. give yourself a DHCP reservation on <b>192.168.0.100</b> using your mac address

Code:
1. All you need to do is go to the server.ts file and make sure the hostIP variable is <b>'192.168.0.1'</b>.
2. Once that is done run:
```
$ npm run start:dev
```

<hr>

## For local development without Arduino Testing
No router setup required, however you need run the mock arduino.

Server:
1. Before running the server we need to change the ip. Go back to the server.ts file and make sure the hostIP variable is <b>'localhost'</b>.
2. Once that is done run:
```
$ npm run start:dev
```

Mock Arduino:
1. Once the server is up and running all we need to do here is find the <i>mock-arduino/client/index.html</i> file and run it locally.

<hr>

<b>TODO: ADD FRONT END SECTION RYAN PLZ</b>

## Create an Executable:
If further development has been made redeploying an executable is essential as this is a one click server front end app. 

<b>This was created for macOS and therefor to create an executable you must be on macOS</b>

1. Install [pkg](https://www.npmjs.com/package/pkg) globally.
1. You must have a working version of [xcode](https://developer.apple.com/download/all/?q=Xcode) (im sorry).
