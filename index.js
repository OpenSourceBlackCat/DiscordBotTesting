const Discord = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const mainCanvas = Canvas.createCanvas(1280, 720);
const MainCanvas = mainCanvas.getContext("2d");
require("dotenv").config();
const client = new Discord.Client({intents:Object.keys(Discord.GatewayIntentBits)});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on(Discord.Events.MessageCreate, async(msg)=>{
  if (!msg.author.bot) {
    MainCanvas.fillStyle = "rgba(0,0,0,0)";
    MainCanvas.strokeStyle = "rgba(255,255,255,255)";
    MainCanvas.lineWidth = 10;
    MainCanvas.fillRect(0,0,mainCanvas.width,mainCanvas.height);
    MainCanvas.beginPath();
    MainCanvas.arc(mainCanvas.width / 2, mainCanvas.height / 2, mainCanvas.height/3, 0, 2 * Math.PI);
    MainCanvas.stroke();
    //console.log(msg.member.displayAvatarURL({format:"png"}));
    //const UserAvatar = await Canvas.loadImage(msg.author.displayAvatarURL({extension:"png"}));
    //await MainCanvas.drawImage(0,0,mainCanvas.width/2,mainCanvas.height/2);
    //await MainCanvas.drawImage(UserAvatar,700,700,500,500);
    const buffer = mainCanvas.toBuffer("image/png");
    const meow = new Discord.AttachmentBuilder(buffer, {name:"meow.png"});
    await msg.channel.send({content:"Meow", files:[meow]});
  }
})

client.login(process.env.TOKEN)
