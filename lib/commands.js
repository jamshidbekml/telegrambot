require('dotenv').config();
const { Telegraf } = require('telegraf');
const ytdl = require('ytdl-core');
const { BotSubscribers } = require('../model/model');
const { YouTubeVideo, YouTubeAudio } = require('../modules/youtube');
const { InstagramVideo, InstagramStory } = require('../modules/instagram');
const { default: axios } = require('axios');
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
const MessageListener = async (ctx) => {
    try {
        if (ytdl.validateURL(ctx.message.text)) {
            YouTubeVideo(ctx);
        } else if (
            ctx.message.text.includes('instagram.com') &&
            !ctx.message.text.includes('/stories/')
        ) {
            await InstagramVideo(ctx);
        } else if (
            ctx.message.text.includes('instagram.com') &&
            ctx.message.text.includes('/stories/')
        ) {
            await InstagramStory(ctx);
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
};

/****************************************** On Callback Query **************************************/
const QueryListener = (ctx) => {
    console.log(ctx);
    YouTubeAudio(ctx);
};

module.exports = {
    StartCommand,
    MessageListener,
    CountCommand,
    QueryListener,
};
