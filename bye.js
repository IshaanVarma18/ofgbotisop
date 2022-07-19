const { MessageEmbed } = require('discord.js')

module.exports = client => {

    client.on("guildMemberRemove", member => {

        const dmEmbed = `**Goodbye, ${member.user.username}!** I hope you liked being here \n **Thank You**`

        member.send(dmEmbed).catch(err => {console.log("This user has thier DMs off!")})



    })





}