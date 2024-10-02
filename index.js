const Discord = require("discord.js")
require("dotenv").config();
const client = new Discord.Client({intents:Object.keys(Discord.GatewayIntentBits)});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", async(msg)=>{
  if (true) {
    await msg.channel.send("pong");
  }
})

client.login(process.env.TOKEN)
