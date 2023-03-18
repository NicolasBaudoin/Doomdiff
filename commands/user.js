const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Donne la date à laquelle vous êtes arrivé sur le serveur'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(` ${interaction.user.username} est arrivé sur le serveur le  ${interaction.member.joinedAt}.`);
	},
};