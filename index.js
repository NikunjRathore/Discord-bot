import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { connectDB } from './connection.js';
import { createShortURL, checkShortURL} from './controllers/urlcontroller.js';

connectDB();
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
] });

client.on("messageCreate", (message)=>{
    console.log(message.content);
    if(message.author.bot)return;
    message.reply({
        content:"Hii from Bot",
    })
})

client.on("interactionCreate",async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if(interaction.commandName==='shorturl') {
        const longURL = interaction.options.getString("url");
        const shortid = await createShortURL(longURL);
        await interaction.reply(`Short Id is: ${shortid}`);
    }
})
client.on("interactionCreate",async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if(interaction.commandName==='geturl') {
        try{
            const id = interaction.options.getString("shortid");
            const longURL = await checkShortURL(id);
            if (!longURL) throw new Error("No URL found for this Short ID");
            await interaction.reply(`URL is: ${longURL}`);

        }catch(err){
            interaction.reply(`Error:${err}`);
        }
    }
})

client.login(process.env.DISCORD_TOKEN);