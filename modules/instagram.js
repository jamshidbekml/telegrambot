require('dotenv').config();
const axios = require('axios').default;

const InstagramVideo = async (ctx) => {
    try {
        ctx.reply('⏳');
        const {data} = await axios.post(
            'https://reelit.io/api/fetch',
            {
                url: ctx.message.text,
            },
            {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                        'X-Requested-With': 'XMLHttpRequest'
                },
            }
        );

        const links = data.media.data.mediaList
        links.forEach((e) => {
            var videos = e.videos ? e.videos : []
            var images = e.images ? e.images : []
            var username = e.user ? e.user.username : `Instagramdan ko'rish`
            if(videos.length){
                ctx.replyWithChatAction(`upload_video`);
                ctx.telegram
                    .sendMediaGroup(ctx.message.chat.id, [
                        {
                            type: 'video',
                            media: videos[0].url,
                            parse_mode: 'HTML',
                            caption: `
                            @smvideosdl_bot\n\n<i><a href="${ctx.message.text}">${username}</a></i>
                            `,
                        },
                    ])
                    .then((res) => {
                        ctx.telegram.forwardMessage(
                            '@downloadedVideos',
                            res[0].chat.id,
                            res[0].message_id
                        );
                    });
            } else if(!videos.length && images) {
                console.log(e);
                ctx.replyWithChatAction(`upload_photo`);
                ctx.telegram
                    .sendMediaGroup(ctx.message.chat.id, [
                        {
                            type: 'photo',
                            media: e.images[2].url,
                            caption: `@smvideosdl_bot`,
                        },
                    ])
                    .then((res) => {
                        ctx.telegram.forwardMessage(
                            '@downloadedVideos',
                            res[0].chat.id,
                            res[0].message_id
                        );
                    });
            }
        });
    } catch (err) {
        ctx.reply(
            'This link is incorrectly entered or the user account is private',
            {
                reply_to_message_id: ctx.message.message_id,
            }
        );
        console.log(err.message);
    }
};

const InstagramStories = async (ctx) => {
    try {
        ctx.reply('⏳');
        const {data} = await axios.post(
            'https://reelit.io/api/fetch',
            {
                url: ctx.message.text,
                type: 'story',
                username: ctx.message.text.split('/')[5]
            },
            {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                        'X-Requested-With': 'XMLHttpRequest'
                },
            }
        );

        data.media.data.stories.forEach(e => {
            var videos = e.videos ? e.videos : []
            var images = e.images ? e.images : []
            var username = data.media.data.user ? data.media.data.user.username : `Instagramdan ko'rish`
            if(videos.length){
                ctx.replyWithChatAction(`upload_video`);
                ctx.telegram
                    .sendMediaGroup(ctx.message.chat.id, [
                        {
                            type: 'video',
                            media: videos[0].url,
                            parse_mode: 'HTML',
                            caption: `
                            @smvideosdl_bot\n\n<i><a href="${ctx.message.text}">${username}</a></i>
                            `,
                        },
                    ])
                    .then((res) => {
                        ctx.telegram.forwardMessage(
                            '@downloadedVideos',
                            res[0].chat.id,
                            res[0].message_id
                        );
                    });
            } else if(!videos.length && images) {
                console.log(e);
                ctx.replyWithChatAction(`upload_photo`);
                ctx.telegram
                    .sendMediaGroup(ctx.message.chat.id, [
                        {
                            type: 'photo',
                            media: e.images[2].url,
                            caption: `@smvideosdl_bot`,
                        },
                    ])
                    .then((res) => {
                        ctx.telegram.forwardMessage(
                            '@downloadedVideos',
                            res[0].chat.id,
                            res[0].message_id
                        );
                    });
            }
        })
        
    } catch (err) {
        console.log(err.message);
        ctx.reply(
            'This link is incorrectly entered or the user account is private',
            {
                reply_to_message_id: ctx.message.message_id,
            }
        );
    }
};

const ProfilePhoto = async (ctx) => {
    try {
        ctx.reply('⏳');
        const username = ctx.message.text.slice(1)
        const { data } = await axios.get('https://storiesig.info/api/ig/profile/' + username, {
            headers: {
                'referer': 'https://storiesig.info/en/instagram-story-downloader/',
                'user-agent':
                    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
                'x-token': null,
                'x-xsrf-token': process.env.XTOKEN
            },
        })
        ctx.replyWithChatAction('upload_photo');
        ctx.telegram
            .sendMediaGroup(ctx.message.chat.id, [
                {
                    type: 'photo',
                    media: data.result.profile_pic_url,
                    caption: `@smvideosdl_bot`,
                },
            ])
            .then((res) => {
                ctx.telegram.forwardMessage(
                    '@downloadedVideos',
                    res[0].chat.id,
                    res[0].message_id
                );
            });
    } catch (err) {
        console.log(err.message);
    }
};
module.exports = { InstagramVideo, InstagramStories, ProfilePhoto };
