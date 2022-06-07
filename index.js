require('dotenv').config();
const { Telegraf } = require('telegraf');
const ytdl = require('ytdl-core');
const fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('message', async (ctx) => {
    try {
        if (ytdl.validateURL(ctx.message.text)) {
            ctx.reply('⏳');
            const stream = ytdl(ctx.message.text);
            const info = await ytdl.getInfo(ctx.message.text);
            ctx.replyWithVideo(
                {
                    source: stream,
                },
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Audio',
                                    callback_data: ctx.message.text,
                                },
                            ],
                        ],
                    },
                    parse_mode: 'HTML',
                    caption: `
                    @forLearningro_bot\n\n<i>${info.videoDetails.title}</i>
                    `,
                }
            );
        } else {
            ctx.reply('Ushbu link xato kiritilgan', {
                reply_to_message_id: ctx.message.message_id,
            });
        }
    } catch (err) {
        console.log(err);
        ctx.reply('Botda xatolik roy berdi', {
            reply_to_message_id: ctx.message.message_id,
        });
    }
});

bot.on('callback_query', (ctx) => {
    ctx.replyWithAudio(
        {
            source: ytdl(ctx.update.callback_query.data, {
                filter: 'audioonly',
            }),
        },
        {
            caption: '@forLerarningro_bot',
        }
    );
});

bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch();
