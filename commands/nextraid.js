const https = require('https');
const config = require('../config');

module.exports = function(client, msg, args) {
  https.get('https://dpsinject.us/api/v1/discord/user/id/' + msg.author.id + '/characters', function(res) {
    res.on('data', function(data) {
      let mtChars = JSON.parse(data).characters.filter(c => c.charServer == 'Mount Tyrannas').map(c => c.charName);
      https.get({
        hostname:'dpsinject.us',
        port: 443,
        path: '/api/v1/raid/schedule',
        method: 'GET',
        headers: { Cookie: 'connect.sid=' + config.DPSINJECT_SID }
      }, function(res) {
        res.on('data', function(data) {
          let info = JSON.parse(data);
          let isIn = [];
          let curr = 0;
          while(info.raids[curr]) {
            let raidRoster = info.raids[curr].dps.concat(info.raids[curr].tank).concat(info.raids[curr].priest).concat(info.raids[curr].mystic);
            raidRoster.forEach(rChar => {
              mtChars.forEach(mChar => {
                if (mChar == rChar.name) {
                  isIn.push({char: mChar, idx: curr});
                }
              });
            });
            curr++;
          };
          if (isIn.length <= 0) {
            msg.channel.send('\`\`\`You aren\'t in any raids this week.\`\`\`');
            return;
          }
          let output = '\`\`\`';
          isIn.forEach(inR => output += info.raids[inR.idx].dayOfWeek + ' ' + info.raids[inR.idx].date + ' at ' + info.raids[inR.idx].time + ' on ' + inR.char + '\n');
          output += '\`\`\`';
          msg.channel.send(output);
        });
      });
    });
  });
};
