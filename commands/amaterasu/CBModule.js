var cleverbot = require("cleverbot.io"),
bot = new cleverbot("rvCFWUb2LdAseoPa", "zMYnctNen0jIQjEtG9K6U6YODwdeGmve");
bot.setNick("Amaterasu")
bot.ask("Are you lonely", function (err, response) {
  console.log(response);
}
