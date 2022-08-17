const axios = require('axios').default;

const TikTokVideo = async (contex) => {
    try {
        contex.reply('⏳');
        const {data} = await axios.post(
            'https://api.ssstikvideo.com/api/v1/remove_watermark',
            {
                url: contex.message.text,
                method: 'random'
            },
            {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                },
            }
        );

        contex.replyWithChatAction('upload_video');
        console.log(data.data);
        contex
            .replyWithVideo(
                {
                    url: data.data['mp4_hd'] ? data.data['mp4_hd'] : data.data['mp4'],
                },
                {
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

module.exports = {TikTokVideo}