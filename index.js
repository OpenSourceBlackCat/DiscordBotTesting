const Discord = require("discord.js");
const Canvas = require("canvas");
const mainCanvas = Canvas.createCanvas(1920, 1080);
const MainCanvas.getContext("2d");
require("dotenv").config();
const client = new Discord.Client({intents:Object.keys(Discord.GatewayIntentBits)});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on(Discord.Events.MessageCreate, async(msg)=>{
  if (!msg.author.bot) {
    MainCanvas.fillStyle("rgba(0,0,0,0)");
    MainCanvas.fillRect(0,0,1920,1080);
    const UserAvatar = new Image();
    UserAvatar.src = msg.user.avatarURL();
    UserAvatar.onload = async() => {
      MainCanvas.drawImage(UserAvatar,700,700,500,500);
    };
    const buffer = mainCanvas.toBuffer("image/png");
    const meow = new Discord.AttachmentBuilder(buffer, {name:"meow.png"});
    await msg.channel.send({content:"Meow", files:[meow]});
  }
})

client.login(process.env.TOKEN)
