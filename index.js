require('dotenv').config();
const { Telegraf } = require('telegraf');
console.log(process.env.BOT_TOKEN);

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('message', async (ctx) => {
    try {
        ctx.replyWithLocation(0, 0);
    } catch (err) {
        console.log(err);
        ctx.reply('Botda xatolik roy berdi', {
            reply_to_message_id: ctx.message.message_id,
        });
    }
});
bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch();
