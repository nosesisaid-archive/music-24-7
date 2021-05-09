const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core')
const config = require('config.json')('./config.json')
client.on('ready', () => {



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

client.on('message', async function (message)  {
    var musicmod = ['id#1', 'id#2']
    if(message.content === `${config.prefix}reset`) {
        if(!musicmod.includes(message.author.id)) return message.channel.send('no tienes los permisos necesarios')
        message.channel.send('reiniciando 💿').then( () => {
            process.exit()
        })

    }
}) 
client.login(config.token)
