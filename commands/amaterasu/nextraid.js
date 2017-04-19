const GSS = require('google-spreadsheet');
let raidSheet = new GSS('1pSs5-carUxCgMx4uh1lfIT0NTKx9ZEVvgt7Cama2krc');

module.exports = function(client, msg, args) {
  msg.channel.send('Loading raid spreadsheet');
  raidSheet.getInfo(function(err, info) {
    if (err) console.log(err);
    msg.channel.send('Loaded sheet: ' + info.title + ' by ' + info.author.email);
    let sheet = info.worksheets[0];
    msg.channel.send('Schedule sheet: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
  });
};
