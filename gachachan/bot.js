const { token } = require('./config.json');
const { Client } = require('discord.js');
const client = new Client();

client.login(token);