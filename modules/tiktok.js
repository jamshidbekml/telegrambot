const axios = require('axios').default;

const TikTokVideo = async (contex) => {
    try {
        contex.reply('⏳');
        const {data} = await axios.post(
            'https://ssyoutube.com/api/convert',
            {
                url: contex.message.text,
            },
            {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                },
            }
        );
        const stream = data.url.find((e) => e.type === 'mp4').url
            contex.replyWithChatAction('upload_video');
            contex
                .replyWithVideo(
                    {
                        url: stream,
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
                                @smvideosdl_bot
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
    }
    catch (err) {
        contex.reply('Sorry ☹️. The download link was not found')
        console.log(err)
    }
}

const TikTokAudio = async (context) => {
    const {data} = await axios.post(
        'https://ssyoutube.com/api/convert',
        {
            url: context.update.callback_query.data,
        },
        {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
            },
        }
    );
    context.replyWithChatAction('upload_audio');
    context
        .replyWithAudio(
            {
                url: data.url.find((e) => e.type === 'mp3').url,
                filename: 'Music',
            },
            {
                caption: '@smvideosdl_bot',
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

module.exports = {TikTokVideo,TikTokAudio}