const commando = require('discord.js-commando');
const bot = new commando.Client();

const LOGIN_TOKEN = process.env.LOGIN_TOKEN || require('./config').LOGIN_TOKEN;

bot.registry.registerGroup('random', 'Random')
  .registerDefaults()
  .registerCommandsIn(__dirname + '/commands');

bot.on('ready', () => console.log('Bot connected as ' + bot.user.username));

bot.login(LOGIN_TOKEN);
