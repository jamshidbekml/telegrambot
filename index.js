require('dotenv').config();
const { Telegraf } = require('telegraf');
const {
    StartCommand,
    MessageListener,
    CountCommand,
    QueryListener,
} = require('./lib/commands');
const { sequelize, BotSubscribers } = require('./model/model');

const bot = new Telegraf(process.env.BOT_TOKEN);

sequelize
    .sync({ force: false })
    .then(() => console.log('connected'))
    .catch((err) => console.log(err));

// const UserMesages = async (msg) => {
//     try {
//         const users = await BotSubscribers.findAll();
//         users.forEach((e) => {
//             ctx.telegram.sendMessage(1771234776, msg);
//         });
//     } catch (err) {
//         console.log(err.message);
//     }
// };

// UserMesages('Botga instagramdan videolar tortish funksiyasi qo`shildi');

bot.start((ctx) => StartCommand(ctx));

bot.hears('/count', (ctx) => CountCommand(ctx));

bot.on('message', (ctx) => MessageListener(ctx));

bot.on('callback_query', (ctx) => QueryListener(ctx));

bot.launch();
