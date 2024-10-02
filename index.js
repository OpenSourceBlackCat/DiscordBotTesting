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
    MainCanvas.fillStyle = "rgba(100,100,100,255)";
    MainCanvas.fillRect(0,0,mainCanvas.width,mainCanvas.height);
    //console.log(msg.member.displayAvatarURL({format:"png"}));
    const UserAvatar = await Canvas.loadImage(msg.author.displayAvatarURL({extension:"png"})).then(img=>{
      MainCanvas.drawImage(img,700,700,500,500);
    });
    //await MainCanvas.drawImage(UserAvatar,700,700,500,500);
    const buffer = mainCanvas.toBuffer("image/png");
    const meow = new Discord.AttachmentBuilder(buffer, {name:"meow.png"});
    await msg.channel.send({content:"Meow", files:[meow]});
  }
})

client.login(process.env.TOKEN)
