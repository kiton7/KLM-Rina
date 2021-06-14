const mosca = require('mosca');

var moscaSettings = {
    port: 1883,
};

var server = new mosca.Server(moscaSettings); //here we start mosca
server.on('ready', setup); //on init it fires up setup()

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});


// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published', packet.payload);
});

module.exports = server;