import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'shorturl',
    description: 'Giving sort ids for links',
    options:[{
      name: 'url',
      description: 'LONG url',
      required: true,
      type: 3
    }
    ]
  },
  {
    name: 'geturl',
    description:"Giving long url of shortened urls",
    options:[{
      name:'shortid',
      required: true,
      description: "Getting the url of the short id created",
      type: 3
    }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}