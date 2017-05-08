const CLEVERBOT_USER = process.env.CLEVERBOT_USER || require('../config').CLEVERBOT_USER;
const CLEVERBOT_KEY = process.env.CLEVERBOT_KEY || require('../config').CLEVERBOT_KEY;
var cleverbot = require('cleverbot.io'),
bot = new cleverbot(CLEVERBOT_USER, CLEVERBOT_KEY);
bot.setNick('ChinguBot');
bot.create(function (err, session) {
  // session is your session name, it will either be as you set it previously, or cleverbot.io will generate one for you

  // Woo, you initialized cleverbot.io.  Insert further code here
});

module.exports = function(client, msg, args) {
  if (args.length <= 1) {
    msg.channel.send('SAY SOMETHING!');
    return;
  }

  var question = '';
  for (let i = 1;i < args.length;i++) {
    question += args[i] + ((i == args.length - 1) ? '' : ' ');
  }

  bot.ask(question, function(err, response) {
    if(!err)
      msg.channel.send(response);
    else
      console.log(response);
  });
};
