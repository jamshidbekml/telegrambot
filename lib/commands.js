require('dotenv').config();
const ytdl = require('ytdl-core');
const { BotSubscribers } = require('../model/model');
const { YouTubeVideo, YouTubeAudio } = require('../modules/youtube');
const axios = require('axios').default;
const {
    InstagramVideo,
    InstagramStories,
    ProfilePhoto,
} = require('../modules/instagram');
/****************************************** Start Command **************************************/
const StartCommand = async (ctx) => {
    try {
        ctx.reply(
            `${ctx.message.from.first_name} welcome to our video uploader bot !!!`
        );

        ctx.telegram.sendMessage(
            process.env.ADMIN,
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
        if (ctx.message.from.id == process.env.ADMIN) {
            let subscribers = await BotSubscribers.findAll();

            +ctx.telegram.sendMessage(process.env.ADMIN, subscribers.length);
        }
    } catch (err) {
        console.log(err.message);
    }
};

/****************************************** On message **************************************/
const MessageListener = async (ctx) => {
    try {
        if (ytdl.validateURL(ctx.message.text)) {
            YouTubeVideo(ctx);
        } else if (
            ctx.message.text.includes('instagram.com') &&
            !ctx.message.text.includes('/stories/')
        ) {
            InstagramVideo(ctx);
        } else if (
            ctx.message.text.includes('instagram.com') &&
            ctx.message.text.includes('/stories/')
        ) {
            InstagramStories(ctx);
        } else if (ctx.message.text.includes('@')) {
            ProfilePhoto(ctx);
        } else {
            ctx.reply('This link contains an error', {
                reply_to_message_id: ctx.message.message_id,
            });
        }
    } catch (err) {
        console.log(err.message);
        ctx.reply('An error occurred, please check the link and try again', {
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
