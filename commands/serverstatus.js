var request = require('request'); var mcCommand = '!status'; 
client.on('message', message => {
if (message.content === mcCommand) {
    var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort; //change to tera server parse from zayo
    request(url, function(err, response, body) {
        if(err) {
            console.log(err);
            return message.reply('Cannot contact Tera servers');
        }
        body = JSON.parse(body);
        var status = 'Mount Tyrannus is Down';
        if(body.online) {
            status = 'Mount Tyrannus is Online';
        }
        message.reply(status);
    });
}
});
