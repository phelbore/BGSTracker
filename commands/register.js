module.exports = {
	name: 'register',
	description: 'register yourself with the bot',
	execute(client, message) {
		console.log(message.channel.DMChannel);
		message.channel.send('You\'ve been registered.');
	}
}
