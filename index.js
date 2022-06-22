require('dotenv').config();
const { Telegraf } = require('telegraf');
const {
    StartCommand,
    MessageListener,
    CountCommand,
    QueryListener,
} = require('./lib/commands');
const { sequelize, BotSubscribers } = require('./model/model');

const bot = new Telegraf(process.env.TOKEN);

sequelize
    .sync({ force: false })
    .then(() => console.log('connected'))
    .catch((err) => console.log(err));

bot.start((ctx) => StartCommand(ctx));

bot.hears('/count', (ctx) => CountCommand(ctx));

bot.on('message', (ctx) => {
    if (
        ctx.message.chat.id == process.env.ADMIN &&
        ctx.message.text.includes('/elon')
    ) {
        console.log(ctx.message);
    } else {
        MessageListener(ctx);
    }
});

bot.on('callback_query', (ctx) => QueryListener(ctx));

bot.launch();
