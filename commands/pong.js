const { SlashCommandBuilder } = require('discord.js');




module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Replies with your actual rank'),
	async execute(interaction) {



        
		return interaction.reply('Ping!');
	},
};