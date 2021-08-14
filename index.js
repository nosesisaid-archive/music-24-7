const Discord = require('discord.js')
const client = new Discord.Client({ intents: 129})
const ytdl = require('ytdl-core')
const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  AudioPlayerStatus
} = require("@discordjs/voice");


require("dotenv").config()


client.on('ready', () => {


    console.log('Working correctly');


const player = createAudioPlayer({
behaviors: {
noSubscriber: NoSubscriberBehavior.Pause,
},
});
    
    
const guild = client.guilds.cache.get(process.env.guildID);
const connection = joinVoiceChannel({
  channelId: process.env.channelID,
  guildId: guild.id,
  adapterCreator: guild.voiceAdapterCreator,
});

    const audio = ytdl(process.env.video);
    
    const resource = createAudioResource(audio);
    
    player.play(resource);
    
    connection.subscribe(player)
    
    player.on(AudioPlayerStatus.Idle, _ => process.exit())

})
client.login(process.env.token)
