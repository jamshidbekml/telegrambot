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

bot.start((ctx) => StartCommand(ctx));

bot.hears('/count', (ctx) => CountCommand(ctx));

bot.on('message', async (ctx) => {
    try {
        if (ctx.message.chat.id == process.env.ADMIN && ctx.message.caption) {
            if (ctx.message.caption.includes('/elon')) {
                const users = await BotSubscribers.findAll();
                users.forEach((e) => {
                    ctx.telegram.sendPhoto(
                        e.dataValues.chatId,
                        ctx.message.photo[0].file_id,
                        {
                            caption: ctx.message.caption
                                .split('/elon')
                                .join('')
                                .trim(),
                        }
                    );
                });
            }
        } else {
            MessageListener(ctx);
        }
    } catch (err) {
        console.log(err);
    }
});

bot.on('callback_query', (ctx) => QueryListener(ctx));

bot.launch();
