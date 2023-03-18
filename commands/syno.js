const axios = require('axios');
const cheerio = require('cheerio');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()  //create de command slash 
		.setName(`syno-overwatch`)  //name of the command
		.setDescription('Donne les rangs de Syno sur Overwatch'), //description
	async execute(interaction) {

        const response = await axios.get('https://overwatch.blizzard.com/fr-fr/career/Syno-21453/')
        const $ = cheerio.load(response.data)

        //set a RegEx that extract only the tier name of the rank in the url of icon rank
        const regex = /(?<=\/)[a-zA-Z]+-\d+(?=-[a-zA-Z0-9]*\.png)/;
        // Extract the image URLs of the ranks
        const tankUrl = $('img.Profile-playerSummary--rank')[0].attribs.src;
        const dpsUrl = $('img.Profile-playerSummary--rank')[1].attribs.src;
        const suppUrl = $('img.Profile-playerSummary--rank')[2].attribs.src;
        //Use Regex on urls
        const tankRank = tankUrl.match(regex)[0];
        const dpsRank = dpsUrl.match(regex)[0];
        const suppRank = suppUrl.match(regex)[0];
        
        // reply tier rank in an embed message
        const embed = new EmbedBuilder()
        .setTitle('Syno est actuellement classé :')
        .setURL('https://overwatch.blizzard.com/fr-fr/career/Syno-21453/')
        .setFields(
            {name:'Tank', value: `${tankRank}`, inline:true},
            {name:"DPS", value:`${dpsRank}`, inline:true},
            {name:"Support", value:`${suppRank}`, inline:true}
            )
        .setTimestamp()
        .setFooter({text:'Mise à jour :'});

		await interaction.reply({embeds:[embed]});
	},
};