const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core')
const config = require('config.json')('./config.json')
var t = config.prefix
client.on('ready', () => {



    console.log('funcionando correctamente')
    client.user.setStatus(`online`) 
    
    const channel = client.channels.cache.get(config.channel)

    channel.join().then(connection => {

        const stream = ytdl(config.video, { filter: 'audioonly' });
        const dispatcher = connection.play(stream);
        console.log(`poniendo el video con la url: \n `+ config.video)
        dispatcher.on('finish', () => {
            process.exit()
        });
    })

})

client.on('message', async function (message) {
    const args = message.content.trim().split(/ +/g);

    member = message.members.mentions.first()

    let DJ = message.guild.roles.cache.get(config.roleid)
    if (message.startsWith(`${t}reset`)) {
        if (message.member.roles.cache.has(DJ.id)) {
            message.reply('Se va a reiniciar el proceso, recuerda que si no tienes reinicio automatico deberás volver a ejecutralo.').then(() => {
                process.exit()
            })
            
        } else {
            message.reply('No tienes los permisos necesarios para usar este comando.')
        }
    }


    if (message.startsWith(`${t}Dj`) || message.startsWith(`${t}dj`)) {

        if (args[0] === 'add') {
        if(member.roles.cache.has(DJ.id)) return
            if (message.member.roles.cache.has(DJ.id)) {
                message.reply('Se le va a añadir el rol ' + DJ.name + ' a ' + member.toString()).then((f) => {
                    member.roles.add(DJ)
                })

            } else {
                message.reply('No tienes los permisos necesarios para usar este comando.')
            }
        }
        if (args[0] === 'remove') {
            if (!member.roles.cache.has(DJ.id)) return
            if (message.member.roles.cache.has(DJ.id)) {
                message.reply('Se le va a quitar el rol ' + DJ.name + ' a ' + member.toString()).then((f) => {
                    member.roles.remove(DJ)
                })

            } else {
                message.reply('No tienes los permisos necesarios para usar este comando.')
            }
        }

        if (message.startsWith(`${t}eval`)) {
            let evaliado = eval(args.split(" "))
            .catch(err => console.error(err))
            .then(message.channel.send(evaliado))
        }
    }
})
client.login(config.token)
