const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const user = require('./user');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Provides Overwatch staistics of the user.'),
	async execute(interaction) {
        const rank = require('C:/Users/baudo/Desktop/github/Doomdiff/rank.json');
        const userOw = interaction.user.username;
        const profil = rank[userOw].alias;
       
        function getstats(){
            if(rank=="Vrexio"){return rank.Vrexio.rTank}
        else{return "oupsi"}
    }
     
        
        const exampleEmbed = new EmbedBuilder()
                            .setColor(0x0099FF)
                            .setTitle(`${interaction.user.username} stats ${profil} ${getstats()}`)
                            // .setURL('https://discord.js.org/')
                            // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                            // .setDescription('Here's your ranks')
                            // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                            .addFields(
                                { name: 'Tank', value: interaction.user.username},
                                { name: 'DPS', value: 'Some value here', inline: true },
                                { name: 'Support', value: 'Some value here', inline: true },
                            )
                            .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
                            // .setImage('https://i.imgur.com/AfFp7pu.png')
                            .setTimestamp()
                            // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
		// interaction.stats is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};