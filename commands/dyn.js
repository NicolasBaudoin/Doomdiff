const axios = require('axios');
const cheerio = require('cheerio');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

// Importez le fichier JSON contenant les correspondances entre les noms d'utilisateur et les gamer tags.
const gamerTags = require("./gamerTags.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`username`)
		.setDescription(`Donne les rangs de l'utilisateur ajouté sur Overwatch`),
	async execute(interaction) {
		// Récupérer le nom d'utilisateur fourni par l'utilisateur dans la commande.
		const username = interaction.options.getString('username');

		// Utilisez le nom d'utilisateur pour récupérer le gamer tag correspondant dans le fichier JSON.
		const gamerTag = gamerTags[username.toLowerCase()];

		// Vérifiez si le nom d'utilisateur fourni est valide et a une correspondance dans le fichier JSON.
		if (!gamerTag) {
			await interaction.reply(`Désolé, je ne peux pas trouver de correspondance pour l'utilisateur ${username}`);
			return;
		}

		// Construisez l'URL pour récupérer les informations de rang à partir du gamer tag.
		// const url = `https://overwatch.blizzard.com/fr-fr/career/${gamerTag[username][url]}/`;
        const url = gamerTag.url

		// Récupérez les informations de rang à partir de l'URL.
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);
        // find the rank in image url
		const regex = /(?<=\/)[a-zA-Z]+-\d+(?=-[a-zA-Z0-9]*\.png)/; 
        // target the attribs with rank
		const tankUrl = $('img.Profile-playerSummary--rank')[0].attribs.src;
		const dpsUrl = $('img.Profile-playerSummary--rank')[1].attribs.src;
		const suppUrl = $('img.Profile-playerSummary--rank')[2].attribs.src;
        // find the rank in the url of the image
		const tankRank = tankUrl.match(regex)[0];
		const dpsRank = dpsUrl.match(regex)[0];
		const suppRank = suppUrl.match(regex)[0];

		// Construisez un message d'embed pour afficher les informations de rang.
		const embed = new EmbedBuilder()
			.setTitle(`${username} est actuellement classé :`)
			.setURL(url)
			.setFields(
				{ name: 'Tank', value: `${tankRank}`, inline: true },
				{ name: "DPS", value: `${dpsRank}`, inline: true },
				{ name: "Support", value: `${suppRank}`, inline: true }
			)
			.setTimestamp()
			.setFooter({ text: 'Mise à jour :' });

		await interaction.reply({ embeds: [embed] });
	},
};
