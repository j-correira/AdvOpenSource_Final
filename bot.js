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

/////////////
// role names
// @haha BR go brrrbrrr
// @car soccer
// @blockybois
// @EFT


////////////
// variables
const games = [
    'Halo',
    'Rocket League',
    'Minecraft',
    'Apex',
    'Poker',
    'Go Outside Nerd',
    'Backpack Simulator',
    'Grand Theft Auto'
  ]

  const roasts = [
    'You’re a grey sprinkle on a rainbow cupcake.',
    'You are more disappointing than an unsalted pretzel.',
    'Light travels faster than sound which is why you seemed bright until you spoke.',
    'Your secrets are always safe with me. I never even listen when you tell me them.',
    'Your face makes onions cry.',
    'Keep rolling your eyes, you might eventually find a brain.',
    'Your face is just fine but we’ll have to put a bag over that personality.',
    'I thought of you today. It reminded me to take out the trash.',
    'Did I invite you to the barbecue? Then why are you all up in my grill?',
    'Yeah? Well, you smell like hot dog water.',
    'You’re the reason this country has to put directions on shampoo.',
    'You have an entire life to be an idiot. Why not take today off?',
    'You are like a slinky — not really good for much, but brings a smile to my face when pushed down the stairs.',
  ]

  const coin = [
      'Heads',
      'Tails'
  ]
  
////////////
// functions

// random generators
const randomGame = () => games[Math.floor(Math.random() * games.length)]
const coinFlip = () => coin[Math.floor(Math.random() * coin.length)]
const roast = () => roasts[Math.floor(Math.random() * roasts.length)]

// delete msg after 10secs
function cleanup(hoobie){

    setTimeout(function() {
        hoobie.delete();
    }, 
        10000
    );
}

// "main"
client.on('message', message => {

    if (!message.content.startsWith("$") || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();


///////////
// commands
if (message.content === `${prefix}ping`) {
	message.channel.send('Pong!');
} 

else if (message.content === `${prefix}beep`) {
	message.channel.send('Boop!');
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
     **'$roast'** : Roast a homie *EX: '$roast @sweenz* \n
     
     `);
}

////////////
// test delete msg
// else if (command === 'testDelete') {
//     message.channel.send(`This message will be deleted shortly...`);
//     // .then(message => {
//     //     message.delete({ timeout: 3000 /*time until delete in milliseconds*/});
//     // })
// }


else if (command === 'td') {
    message.channel.send('This message will be deleted shortly')
    .then(message=> {
        cleanup(message)
    })
}

////////////
// roast
else if (command === 'roast') {
    message.channel.send(`Hey ${args[0]}, ` + roast())
    .then(message=> {
        message.react('🤣')
        message.react('😱')
        message.react('😳')
        message.react('😰')
        message.react('😇')
    })
}

////////////
// command not found [KEEP AT END]
else if (command != null) {
    message.channel.send('Command not recognized. Please use $help for supported commands');
}


});

// login to Discord with your app's token
client.login(token);
