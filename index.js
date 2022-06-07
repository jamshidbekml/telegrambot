require('dotenv').config();
const { Telegraf } = require('telegraf');
const {
    StartCommand,
    MessageListener,
    CountCommand,
    QueryListener,
} = require('./lib/commands');
const { sequelize } = require('./model/model');

const bot = new Telegraf(process.env.BOT_TOKEN);

sequelize
    .sync({ force: false })
    .then(() => console.log('connected'))
    .catch((err) => console.log(err));

bot.start((ctx) => StartCommand(ctx));

bot.hears('/count', (ctx) => CountCommand(ctx));

bot.on('message', (ctx) => MessageListener(ctx));

bot.on('callback_query', (ctx) => QueryListener(ctx));

bot.launch();
