const { Client, IntentsBitField, GatewayIntentBits } = require('discord.js');
const tmi = require('tmi.js');
const { getNext } = require('./streamcalander');
const moment = require('moment')
require('dotenv').config();

let bot = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,]
});

let client = new tmi.client({
    channels: [process.env.CHANNEL],
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASS
    },
})
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
client.connect();
client.on("connected", onConnectedHandler);

client.on('message', async (channel, tags, message, self) => {
    // Ignore echoed messages.
    if (self) return;

    if (!message.toLowerCase().startsWith("!")) return;

    let args = message.substring(1).split(" ");

    const cmd = args[0].toLowerCase();

    switch (cmd) {
        case "hello":
            client.say(channel, `@${tags.username}, heya!`);
            break;
        case "discord":
            client.say(channel, `https://discord.gg/tUpsrAmkqp`);
            break;
        case "help":
            client.say(channel, `Commands: !hello, !discord, !help`)
            break;
        case "nextstream":
            client.say(channel, await getNext(moment().format("M/D/YYYY")));
    }




});


bot.once('ready', async () => {
    console.log(`${bot.user.username} is ready`);
    bot.user.setActivity({ name: await getNext(moment().format("M/D/YYYY")) });

    setInterval(async () => {
        bot.user.setActivity({ name: await getNext(moment().format("M/D/YYYY")) });
    }, 75000)
})

bot.login(process.env.TOKEN);