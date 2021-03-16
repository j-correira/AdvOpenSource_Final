// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});


////////////
// variables
const games = [
    'Halo',
    'Rocket League',
    'Minecraft',
    'Apex',
    'Poker',
    'Go Outside Nerd',
    'Backpack Simulator'
  ]

  const coin = [
      'Heads',
      'Tails'
  ]
  
////////////
// functions
const randomGame = () => games[Math.floor(Math.random() * games.length)]
const coinFlip = () => coin[Math.floor(Math.random() * coin.length)]



client.on('message', message => {

    if (!message.content.startsWith("$") || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();


///////////
// commands
if (message.content === `${prefix}ping`) {
	message.channel.send('Pong!');
} else if (message.content === `${prefix}beep`) {
	message.channel.send('Boop!');
}

////////////
// hoobie
else if (message.content === `${prefix}hoobie`) {
	message.channel.send('Doobie!');
}

////////////
// server info
else if (message.content === `${prefix}server`) {
	message.channel.send(`**Server name:** ${message.guild.name}\n**Total members:** ${message.guild.memberCount}`);
}

////////////
// args test
else if (command === 'args') {
	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
}
else if (command === 'ping') {
	// grab the "first" mentioned user from the message
	// this will return a `User` object, just like `message.author`
	const taggedUser = message.mentions.users.first();

	message.channel.send(`You wanted to ping: ${taggedUser.username}`);
}

////////////
// coin flip
else if (command === 'coin') {
    message.channel.send(`${message.author}, `  + " :coin: " + coinFlip() + " :coin:");
}

////////////
// timer
else if (command === 'timer') {
    message.channel.send(`⏱ **${args[0]} Minute Timer Started** ⏱`)

    var mins = args[0] * 60000;
        
    setTimeout(function() {
        message.channel.send(`🚨 **${args[1]} Timer Ended 🚨**`);
        message.channel.send({ files: ["https://media.giphy.com/media/HhTXt43pk1I1W/giphy.gif"]});
        }, mins);    
}

////////////
// random game
else if (command === 'game') {
    message.channel.send(`${message.author}, you should play: ` + randomGame());
}

////////////
// help guide 
else if (command === 'help') {
    message.channel.send(`__**SWNZ.exe Command List**__\n
     **'$help'** : List of commands and their function\n
     **'$timer'** : Start a timer and notfies users/roles *EX: '$timer 5 @sweenz'*\n
     **'$game'** : Random game suggestion\n
     **'$coin'** : Flip a coin \n
     **'$server'** : Get server stats \n
     **'$hoobie'** : Doobie! \n
     
     `);
}




});



// login to Discord with your app's token
client.login(token);
