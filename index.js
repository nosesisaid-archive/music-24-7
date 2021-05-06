const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core')
const config = require('config.json')('./config.json')
client.on('ready', () => {

var i = 0
    console.log('funcionando correctamente')
    client.user.setStatus(`online`) 
    const channel = client.channels.cache.get(config.channel)

    channel.join().then(connection => {

        const stream = ytdl(config.video, { filter: 'audioonly' });
        const dispatcher = connection.play(stream);
        console.log(`poniendo el video con la url: \n `)
        dispatcher.on('finish', () => {
            process.exit()
        });
    })

})
client.login(config.prefix)
