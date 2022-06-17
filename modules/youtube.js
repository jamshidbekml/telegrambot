const ytdl = require('ytdl-core');

const YouTubeVideo = async (contex) => {
    contex.reply('⏳');
    const info = await ytdl.getInfo(contex.message.text);
    if (info.formats[0].contentLength / 1024 / 1024 < 50) {
        const stream = ytdl(contex.message.text);
        contex.replyWithChatAction('upload_video');
        contex.replyWithVideo(
            {
                source: stream,
            },
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Audio',
                                callback_data: contex.message.text,
                            },
                        ],
                    ],
                },
                parse_mode: 'HTML',
                caption: `
                            @smvideosdl_bot\n\n<i>${info.videoDetails.title}</i>
                            `,
            }
        );
    } else {
        contex.reply(
            'Ushbu videoni hajmi kutilgandan kattaroq iltimos faqat kichik hajmdagi videolarni yuboring !!!',
            {
                reply_to_message_id: contex.message.message_id,
            }
        );
    }
};

// Send audio

const YouTubeAudio = (context) => {
    context.replyWithChatAction('upload_audio');
    context.replyWithAudio(
        {
            source: ytdl(context.update.callback_query.data, {
                filter: 'audioonly',
            }),
        },
        {
            caption: '@forLerarningro_bot',
        }
    );
};

module.exports = { YouTubeVideo, YouTubeAudio };
