const {prefix} = require ('../config.json');
module.exports = {
	name: 'help',
	description: 'Get help',
	aliases: ['h'],
	usage: '[command name]',
	execute(client, message, args) {
		const commands = client.commands;
		let result = '';
		message.channel.send('Help sent, check your DMs');
		if(!args.length) {
			result += commands.map(command => command.description?command.name+': '+command.description:command.name).join('\n');
			result += '```\nYou can ask me for help about individual commands too.';
			return message.author.sendCode('',result, {split:true})
			.catch(error => {
				console.error(`Couldn't DM ${message.author.tag}.\n`, error);
				message.reply('I can\'t seem to DM you, please make sure you have them enabled.');
			});
		}
	}
}
