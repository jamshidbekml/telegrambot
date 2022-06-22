const ytdl = require('ytdl-core');

const YouTubeVideo = async (contex) => {
    contex.reply('⏳');
    var link = contex.message.text;
    if (link.includes('watch')) {
        link = link.slice(0, 43);
    }
    const info = await ytdl.getInfo(link);
    if (info.formats[0].contentLength / 1024 / 1024 < 50) {
        const stream = ytdl(link);
        contex.replyWithChatAction('upload_video');
        contex
            .replyWithVideo(
                {
                    source: stream,
                },
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Audio',
                                    callback_data: link,
                                },
                            ],
                        ],
                    },
                    parse_mode: 'HTML',
                    caption: `
                            @smvideosdl_bot\n\n<i>${info.videoDetails.title}</i>
                            `,
                }
            )
            .then((res) => {
                contex.telegram.forwardMessage(
                    '@downloadedVideos',
                    res.chat.id,
                    res.message_id
                );
            });
    } else {
        contex.reply(
            'The size of this video is larger than expected, please send only small size videos !!!',
            {
                reply_to_message_id: contex.message.message_id,
            }
        );
    }
};

// Send audio

const YouTubeAudio = async (context) => {
    const info = await ytdl.getInfo(context.update.callback_query.data);
    const title = info.videoDetails.title;
    context.replyWithChatAction('upload_audio');
    context
        .replyWithAudio(
            {
                source: ytdl(context.update.callback_query.data, {
                    filter: 'audioonly',
                }),
                filename: title,
            },
            {
                caption: '@forLerarningro_bot',
            }
        )
        .then((res) => {
            context.telegram.forwardMessage(
                '@downloadedVideos',
                res.chat.id,
                res.message_id
            );
        });
};

module.exports = { YouTubeVideo, YouTubeAudio };
