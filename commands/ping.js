module.exports = {
	name: 'ping',
//	description: 'Test if the bot is working',
	execute(client, message) {
		message.channel.send('Huh?  What?  I\'m awake!');
	}
}
