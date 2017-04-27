const Discord = require('discord.js');
const client = new Discord.Client();

const LOGIN_TOKEN = process.env.LOGIN_TOKEN || require('./config').LOGIN_TOKEN;
const COMMAND_PREFIX = '!';

client.on('message', function(msg) {
  if (!verifyChannel(msg))
    return;
  if (msg.content == 'BP') {
    msg.channel.send('BEEPEE?');
  } else if (msg.content && msg.content.startsWith(COMMAND_PREFIX)) {
    let args = msg.content.split(' ');
    let command = args[0].replace(COMMAND_PREFIX, '');
    handleRoleRequiredCommand(null, command, msg, args);
    handleRoleRequiredCommand('Amaterasu', command, msg, args);
  }
});

function handleRoleRequiredCommand(roleName, command, msg, args) {
  if (roleName != null) {
    client.getMember(msg, msg.author.id).then((member) => {
      if (member.roles.exists('name', roleName)) {
        require('./commands/' + roleName.toLowerCase() + '/' + command)(client, msg, args);
      }
    }).catch(() => { /*empty*/ });
  } else {
    try {
      require('./commands/' + command)(client, msg, args);
    } catch(err) {
      //empty
    }
  }
}

function verifyChannel(msg) {
  if (msg.channel instanceof Discord.DMChannel)
    return true;
  if (msg.channel.name == 'bot-channel')
    return true;
  return false;
}

client.getUser = function(userId) {
  return this.fetchUser(userId.replace(/\D/g, ''));
};

client.getMember = function(msg, userId) {
  return this.getUser(userId).then(user => msg.channel.guild.fetchMember(user));
};

client.on('ready', () => console.log('Bot connected as ' + client.user.username));

client.login(LOGIN_TOKEN);
