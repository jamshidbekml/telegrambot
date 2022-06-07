require('dotenv').config();
const { Telegraf } = require('telegraf');
const { BotSubscribers } = require('../model/model');
const { SendVideo, SendAudio } = require('../modules/youtube');
const bot = new Telegraf(process.env.BOT_TOKEN);
/****************************************** Start Command **************************************/
const StartCommand = async (ctx) => {
    try {
        ctx.reply(`Botimizga xush kelibsiz ${ctx.message.from.first_name}`);

        ctx.telegram.sendMessage(
            1771234776,
            `${ctx.message.from.first_name} @${ctx.message.from.username} botga start bosdi`
        );

        await BotSubscribers.create({
            chatId: ctx.message.from.id,
            name: ctx.message.from.first_name,
        });
    } catch (err) {
        console.log(err.message);
    }
};

/****************************************** Count Command **************************************/
const CountCommand = async (ctx) => {
    try {
        if (ctx.message.from.id == 1771234776) {
            let subscribers = await BotSubscribers.findAll();

            +ctx.telegram.sendMessage(1771234776, subscribers.length);
        }
    } catch (err) {
        console.log(err.message);
    }
};

/****************************************** On message **************************************/
const MessageListener = async (ctx, ytdl) => {
    try {
        if (ytdl.validateURL(ctx.message.text)) {
            SendVideo(ctx, ytdl);
        } else {
            ctx.reply('Ushbu link xato kiritilgan', {
                reply_to_message_id: ctx.message.message_id,
            });
        }
    } catch (err) {
        console.log(err.message);
        ctx.reply('Botda xatolik roy berdi', {
            reply_to_message_id: ctx.message.message_id,
        });
    }
};

/****************************************** On Callback Query **************************************/
const QueryListener = (ctx) => {
    SendAudio(ctx);
};

module.exports = {
    StartCommand,
    MessageListener,
    CountCommand,
    QueryListener,
};