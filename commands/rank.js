const axios = require('axios');
const cheerio = require('cheerio');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Get Vrexio Overwatch competitive ranks.'),
  async execute(interaction) {
    try {
      const response = await axios.get('https://overwatch.blizzard.com/fr-fr/career/Vrexio-2570/');
      const $ = cheerio.load(response.data);

      // Extract the image URLs of the ranks
      
      const vtank = $('img.Profile-playerSummary--rank')[0].attribs.src;
      const vdps = $('img.Profile-playerSummary--rank')[1].attribs.src;
      const vsupp = $('img.Profile-playerSummary--rank')[2].attribs.src;

      const Vrexio = {
        "Tank": vtank,
        "DPS": vdps,
        "Support": vsupp
      };

      await interaction.reply({ embeds: [{
        title: 'Vrexio Overwatch competitive ranks',
        fields: [
          { name: 'Tank', value: '![Tank Rank](https://static.playoverwatch.com/img/pages/career/icons/rank/GoldTier-5-4f4894b821.png)', inline:true },
          { name: 'DPS', value: `![DPS Rank](${vdps})`, inline: true },
          { name: 'Support', value: `![Support Rank](${vsupp})`, inline : true },
          { name: 'Tank Image', value: `[Click here to view](${vtank})`, inline: true },
          { name: 'DPS Image', value: `[Click here to view](${vdps})`, inline: true },
          { name: 'Support Image', value: `[Click here to view](${vsupp})`, inline : true }
        ]
      }]});
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while retrieving Vrexio\'s Overwatch competitive ranks.');
    }
  },
};
