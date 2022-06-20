require('dotenv').config();
const ytdl = require('ytdl-core');
const { BotSubscribers } = require('../model/model');
const { YouTubeVideo, YouTubeAudio } = require('../modules/youtube');
const { Instagram } = require('../modules/instagram');
/****************************************** Start Command **************************************/
const StartCommand = async (ctx) => {
    try {
        ctx.reply(
            `${ctx.message.from.first_name} welcome to our video uploader bot !!!`
        );

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
const MessageListener = (ctx) => {
    try {
        if (ytdl.validateURL(ctx.message.text)) {
            YouTubeVideo(ctx);
        } else if (
            ctx.message.text.includes('instagram.com') &&
            !ctx.message.text.includes('/stories/')
        ) {
            Instagram(ctx, false);
        } else if (
            ctx.message.text.includes('instagram.com') &&
            ctx.message.text.includes('/stories/')
        ) {
            Instagram(ctx, true);
        } else {
            ctx.reply('This link contains an error', {
                reply_to_message_id: ctx.message.message_id,
            });
        }
    } catch (err) {
        console.log(err.message);
        ctx.reply('An error occurred in the bot', {
            reply_to_message_id: ctx.message.message_id,
        });
    }
};

/****************************************** On Callback Query **************************************/
const QueryListener = (ctx) => {
    YouTubeAudio(ctx);
};

module.exports = {
    StartCommand,
    MessageListener,
    CountCommand,
    QueryListener,
};
