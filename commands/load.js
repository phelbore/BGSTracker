module.exports = {
	name: 'load',
	description: 'Load a command file',
	execute(client, message, args) {
		const commandName = args[0];
		// the path is relative to the *current folder*, so just ./filename.js
		delete require.cache[require.resolve(`./${commandName}.js`)];
		// We also need to delete and reload the command from the client.commands Enmap
		client.commands.delete(commandName);
		const props = require(`./${commandName}.js`);
		client.commands.set(commandName, props);
		message.reply(`The command ${commandName} has been loaded`);
		console.log(commandName+' has been loaded.');
	}
}
