const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

//Commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));
for(const file of commandFiles) {
	const command=require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	if(!(message.isMemberMentioned(client.user) || message.content.startsWith(config.prefix)) ||
		message.author.bot) {
		return;
	}
	let content = message.content;
	content = content.replace('<@'+client.user.id+'> ','');
	content = content.replace(config.prefix,'');

	const args = content.split(/ +/);
	const commandName = args.shift().toLowerCase()
	if(!client.commands.has(commandName)) {
		return;
	}

	const command = client.commands.get(commandName);
	if(command.args && !args.length) {
		let reply = 'I need a little more information than that.\n';
		if(command.usage) {
			reply += `{$prefix}{$command.name} ${$command.usage}`;
		}
		return message.channel.send(reply);
	}

	try {
		command.execute(client, message, args);
	} catch (error) {
		console.log(error);
		message.reply('Something doesn\'t seem right...');
	}
});

client.login(config.token);
