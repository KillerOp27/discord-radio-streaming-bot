const Discord = require("discord.js");
const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");
const client = new Discord.Client();
const fs = require("fs");
const token = process.env.token;


/*/ Start of loading events /*/
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});
/*/ End of loading events /*/

/*/ Start of loading commands /*/
client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
  }
});
/*/ End of loading commands /*/

/*/* Login as the bot. /*/
client.login(token).catch(err => console.log(err));
