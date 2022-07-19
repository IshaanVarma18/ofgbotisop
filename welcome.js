const { MessageEmbed } = require('discord.js')

module.exports = client => {

    client.on('guildMemberAdd', member => {

        const dmEmbed = `**Welcome To the server of OnFireGamer, ${member.user.username}!** \n \nThanks For Joining`

        member.send(dmEmbed).catch(err => {console.log("This user has there thier dms of, I cannot send then welcome message!")})



    })





}