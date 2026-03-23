// Import the Discord.js library
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Bot token and user ID
const TOKEN = 'YOUR_DISCORD_BOT_TOKEN';
const USER_ID = 'YOUR_USER_ID'; // Replace with your user ID for Minecraft AFK control

// Function to check if user is in the Minecraft server
let isInMinecraftServer = false;

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Event listener for messages
client.on('messageCreate', message => {
    if (message.author.bot) return; // Ignore messages from bots

    // Command for checking AFK status
    if (message.content === '!afk') {
        if (isInMinecraftServer) {
            message.channel.send(`<@${USER_ID}> is currently AFK in the Minecraft server.`);
        } else {
            message.channel.send(`<@${USER_ID}> is not in the Minecraft server.`);
        }
    }
});

// Function to control AFK status in Minecraft
function setAFKStatus(afk) {
    isInMinecraftServer = afk;
}

// Example of how to set AFK status (you can implement this based on your requirements)
setAFKStatus(true);

// Log in to Discord
client.login(TOKEN);