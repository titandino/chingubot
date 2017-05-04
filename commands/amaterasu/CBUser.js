var cleverbot = require("./app.js");
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
bot = new cleverbot("rvCFWUb2LdAseoPa", "zMYnctNen0jIQjEtG9K6U6YODwdeGmve"); // cleverbot (user, key, nick)

bot.setNick("Amaterasu"); // This is optional
bot.create(function (err, response) {
	rl.setPrompt('You> ');
	rl.prompt();
	rl.on('line', function(line) {
		bot.ask(line, function (err, response) {
			if (err) throw response;
			console.log("Cleverbot:", response);
			rl.prompt();
		});
	}).on('close',function(){
		process.exit(0);
	});
});
