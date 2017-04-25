const https = require('https');
const config = require('../../config');

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
          let curr = info.raids[0];
          while(curr) {
            checkRaid(curr, mtChars, curr.dps, isIn);
            checkRaid(curr, mtChars, curr.tank, isIn);
            checkRaid(curr, mtChars, curr.priest, isIn);
            checkRaid(curr, mtChars, curr.mystic, isIn);
            curr = info.raids[curr.num++];
          };
          let output = '\`\`\`';
          isIn.forEach(inR => output += info.raids[inR.idx].dayOfWeek + ' ' + info.raids[inR.idx].date + ' at ' + info.raids[inR.idx].time + ' on ' + inR.char + '\n');
          output += '\`\`\`';
          msg.channel.send(output);  //needs to change to DM instead of channel msg
        });
      });
    });
  });
};

function checkRaid(raid, myChars, raidChars, isIn) {
  raidChars.forEach(rChar => {
    myChars.forEach(mChar => {
      if (mChar == rChar.name) {
        isIn.push({char: mChar, idx: raid.num});
      }
    });
  });
}
//needs to send every member of each raid a DM 2 hours before their next raid
