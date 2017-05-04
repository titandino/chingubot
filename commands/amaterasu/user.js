var cleverbot = require("./cleverbot.js");
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
bot = new cleverbot("NEED_API_USER", "NEED_API_KEY"); // cleverbot parser

bot.setNick("Amaterasu"); // This is optional
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
