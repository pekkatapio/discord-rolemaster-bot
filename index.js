const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();

client.once('ready', () => {
  console.log(config.name + ': ready to work!');
});

client.on('guildMemberAdd', (member) => {

  // Load discord users from file. File should contain all discord
  // names, one name per line. 
  const text = fs.readFileSync(config.textfile, 'utf-8');
  const users = text.split('\n');

  // Construct discord name from user's name and discriminator, 
  // for example user#1234. 
  const userid = member.user.username + '#' + member.user.discriminator;

  // Check if user exists in users list and gives specified role to
  // user, otherwise ignores.  
  if (users.includes(userid)) {
    const role = member.guild.roles.cache.find(role => role.name === config.role);
    member.roles.add(role);
    console.log(config.name + ': role ' + config.role + ' added to user ' + userid);
  } else {
    console.log(config.name + ': user ' + userid + ' not listed!');
  }

});

client.login(config.token);