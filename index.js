const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js')
const welcome = require('./welcome.js')
const bye = require('./bye.js')

const prefix = 'ofg!';

const client = new Discord.Client({
    allowedMentions: {
        parse: [`everyone`, `users`, `roles`],
        repliedUser: true,

    },
    intents: [
        "GUILDS",
        "GUILD_PRESENCES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS"
    ],

});


client.on("ready", () => {
    console.log("Bot is online!")

    client.user.setActivity(`OnFireGamer`, { type: "WATCHING" })
    client.user.setPresence({ status: 'idle' })

    welcome(client)

    bye(client)

})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    //message array var

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    //test command

    if (command === 'test'){
        message.channel.send('Im Working Properly')
    }

    //youtube

    if (command === 'yt'){
        message.channel.send('https://www.youtube.com/c/ONFIREGAMER4')
    }

    //membercount

    if (cmd === `${prefix}membercount`){

        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle('Member Count')
        .setDescription(`${message.guild.memberCount}`)
        .setTimestamp()

        message.channel.send({ embeds: [embed] })


    }

    //help embed

    if (command === 'help'){

        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle(`:white_check_mark:HELP | ${message.author.tag}`)
        .setDescription('All Commands')
        .setThumbnail('https://yt3.ggpht.com/zlzKflox4XQIbMqq5fCfZYuOgwsZZWkinsF2cpXygyJsahhjUdhs2g-M4YL1TwjqV9IJARswo1k=s88-c-k-c0x00ffffff-no-rj')
        .setFields({ name:'PREFIX', value:'`ofg!`' },
                   { name:'test', value:'`test`' },
                   { name:'ABOUT SERVER', value:'`membercount`' },
                   { name:'Social Media', value:'`sm`' },
                   { name:'Moderation', value:'`warn` | `kick` | `ban`' }
        
        )
        .setTimestamp()

        message.channel.send({ embeds: [embed] });


    }

    //warn command

    if (command === `warn`) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You dont have permission to execute this command")
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.channel.send("I don't have permssion to warn people")
        if (message.member === member) return message.channel.send("You cannot warn yourself!")
        if (!argument[0]) return message.channel.send("You must specify someone in this command")

        let reason = argument.slice(1).join(" ") || 'No reason given'

        const dmEmbed = new MessageEmbed()
        .setDescription(`:white_check_mark: You were **warned** in ${message.guild.name} | ${reason}`)
        .setColor("BLUE")

        const embed = new MessageEmbed()
        .setDescription(`:white_check_mark: ${member} has been **warned** in | ${reason} `)
        .setColor("BLUE")

        message.channel.send({ embeds: [embed] })
        message.react('👍')
        member.send({ embeds: [dmEmbed] }).catch(err => {console.log("This user has their DMs off.")})


        
    }

    //kick command

    if (command === 'kick') {

        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]))
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You dont have permission to execute this command")
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.channel.send("I don't have permssion to kick people")
        if (message.member === member) return message.channel.send("You cannot kick yourself!")
        if (!argument[0]) return message.channel.send("You must specify someone in this command")

        let reason = argument.slice(1).join(" ") || 'No reason given'

        const dmEmbed = new MessageEmbed()
        .setDescription(`:white_check_mark: You were **kicked** in ${message.guild.name} | ${reason}`)
        .setColor("BLUE")

        const embed = new MessageEmbed()
        .setDescription(`:white_check_mark: ${member} has been **kicked** in | ${reason} `)
        .setColor("BLUE")

        member.kick().catch(err => {message.channel("There was an errror kicking this member")})

        message.channel.send({ embeds: [embed] })
        message.react('👍')
        member.send({ embeds: [dmEmbed] }).catch(err => {console.log("This user has their DMs off.")})
    }

    //ban command

    if (command === 'ban') {

        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]))
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("You dont have permission to execute this command")
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send("I don't have permssion to ban people")
        if (message.member === member) return message.channel.send("You cannot ban yourself!")
        if (!argument[0]) return message.channel.send("You must specify someone in this command")

        let reason = argument.slice(1).join(" ") || 'No reason given'

        const dmEmbed = new MessageEmbed()
        .setDescription(`:white_check_mark: You were **baned** in ${message.guild.name} | ${reason}`)
        .setColor("BLUE")

        const embed = new MessageEmbed()
        .setDescription(`:white_check_mark: ${member} has been **baned** in | ${reason} `)
        .setColor("BLUE")

        member.ban().catch(err => {message.channel("There was an errror baning this member")})

        message.channel.send({ embeds: [embed] })
        message.react('👍')
        member.send({ embeds: [dmEmbed] }).catch(err => {console.log("This user has their DMs off")})
    }

    //SocialMedia command

    if (command === 'sm') {

        const row = new MessageActionRow()
        .addComponents(
        new MessageButton()
        .setStyle("LINK")
        .setLabel('Youtube')
        .setURL("https://www.youtube.com/c/ONFIREGAMER4")
        .setEmoji('❤️'),
        new MessageButton()
        .setStyle("LINK")
        .setLabel('Rooter')
        .setURL("https://web.rooter.gg/profile/142417768")
        .setEmoji('💙'),
        new MessageButton()
        .setStyle("LINK")
        .setLabel('Instagram')
        .setURL("https://www.instagram.com/m.r_awe.some/")
        .setEmoji('💜'),
        new MessageButton()
        .setStyle("LINK")
        .setLabel('Discord')
        .setURL("https://discord.gg/QSQquKnsZ3")
        .setEmoji('🔷')
        )
        

        

        message.channel.send( { content: '**OnFireGamer Social Media**', components: [row] } )

        

    }





})


client.login("OTc4ODkxNzUyNTY2MDM4NTk4.GhJauW.5z1LIMn2u5v1Ue4wQ16QpGbuVJyI46X-wTlTVY")