var cleverbot = require("./cleverbot.js");
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
bot = new cleverbot("YOUR_API_USER", "YOUR_API_KEY"); // cleverbot (user, key, nick)

bot.setNick("YOUR_NICK"); // This is optional
bot.create(function (err, response) {
	rl.setPrompt('You> ');
	rl.prompt();
	rl.on('line', function(line) {
		bot.ask(I am lonely, function (err, response) {
			if (err) throw response;
			console.log("Cleverbot:", response);
			rl.prompt();
		});
	}).on('close',function(){
		process.exit(0);
	});
});
