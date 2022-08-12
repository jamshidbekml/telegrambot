const ipp = require('instagram-profile-picture')

require('dotenv').config();
const axios = require('axios').default;

const InstagramVideo = async (ctx) => {
    try {
        ctx.reply('⏳');
        const {data} = await axios.post('https://instasupersave.com/api/convert',{
            url: ctx.message.text
        },{
            headers:{
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                    'X-Requested-With': 'XMLHttpRequest',
                url: ctx.message.text
            }
        })

        var newData = data.url ? data.url : data
        newData.forEach(e => {
            var createUrl = Array.isArray(e.url) ? e.url[0] : e
            var type = createUrl.type === 'jpg' ? 'photo' : 'video'
            ctx.replyWithChatAction(`upload_${type}`);
            ctx.telegram
                .sendMediaGroup(ctx.message.chat.id, [
                    {
                        type: type,
                        media: createUrl.url,
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
        })
        
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
        const {data} = await axios.get('https://api.instavideosave.com/allinone',{
            headers:{
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                    'X-Requested-With': 'XMLHttpRequest',
                url: ctx.message.text
            }
        })
        data.video && data.video.forEach(e => {
            ctx.replyWithChatAction(`upload_video`);
            ctx.telegram
                .sendMediaGroup(ctx.message.chat.id, [
                    {
                        type: 'video',
                        media: e.video,
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
        })

        data.image && data.image.forEach(e => {
            ctx.replyWithChatAction(`upload_photo`);
            ctx.telegram
                .sendMediaGroup(ctx.message.chat.id, [
                    {
                        type: 'photo',
                        media: e,
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
        ctx.reply('Try again later');
        // const username = ctx.message.text.slice(1)
        // ipp(username).then(user => {
        //     console.log(user);
        // })
        // const { data } = await axios.post('https://givefastlink.com/instagram-downloader/api/instagram',{
        //     url: username,
        // }, {
        //     headers: {
        //         'user-agent':
        //             'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
        //     },
        // })
        // ctx.replyWithChatAction('upload_photo');
        // ctx.telegram
        //     .sendMediaGroup(ctx.message.chat.id, [
        //         {
        //             type: 'photo',
        //             media: data.result.profile_pic_url,
        //             caption: `@smvideosdl_bot`,
        //         },
        //     ])
        //     .then((res) => {
        //         ctx.telegram.forwardMessage(
        //             '@downloadedVideos',
        //             res[0].chat.id,
        //             res[0].message_id
        //         );
        //     });
    } catch (err) {
        console.log(err.message);
    }
};
module.exports = { InstagramVideo, InstagramStories, ProfilePhoto };
