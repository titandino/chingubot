var request = require('request');
var cheerio = require('cheerio');

module.exports = function(client, msg, args) {

  // Scraping from Tera Servers Status
  
  url = 'http://tera.enmasse.com/server-status';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var servers = [];
      $('.server-up').filter(function(){
        var data = $(this);
        var serverName = data.children('.server-name').text().trim();
        servers.push({serverName: serverName, status: 'ONLINE'});
      })

      $('.server-down').filter(function(){
        var data = $(this);
        var serverName = data.children('.server-name').text().trim();
        servers.push({serverName: serverName, status: 'OFFLINE'});
      })
    }
    let output = '\`\`\`';
    servers.forEach(function(server){
      output += server.serverName + ': ' + server.status + '\n';
    });
    output += '\`\`\`';
    msg.channel.send(output);
  })
}
