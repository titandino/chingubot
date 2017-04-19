const GSS = require('google-spreadsheet');
let raidSheet = GSS('1pSs5-carUxCgMx4uh1lfIT0NTKx9ZEVvgt7Cama2krc');

module.exports = function(client, msg, args) {
  msg.channel.send('Loading raid spreadsheet');
  raidSheet.getInfo(function(err, info) {
    if (err) console.log(err);
    msg.channel.send('Loaded sheet: ' + info.title + ' by ' + info.author.email);
  });
};
