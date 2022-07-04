const axios = require('axios').default;

const InstagramVideo = async (ctx) => {
    try {
        ctx.reply('⏳');
        const { data } = await axios.get(
            'https://instadownloader.co/instagram_post_data.php?url=' +
                ctx.message.text,
            {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                },
            }
        );
        var newData = JSON.parse(data);
        if (
            newData.videos_links.length == 0 &&
            newData.images_links.length == 0
        ) {
            console.log('Qayta murojat');
            const newLinkArr = ctx.message.text.split('/');
            const newLink = `https://www.instagram.com/${newLinkArr[3]}/${newLinkArr[4]}`;
            const { data } = await axios.get(
                'https://instadownloader.co/instagram_post_data.php?url=' +
                    newLink,
                {
                    headers: {
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                    },
                }
            );
            newData = JSON.parse(data);
        }
        if (newData.images_links) {
            const ImagesLinks = newData.images_links;
            ImagesLinks.forEach((e) => {
                ctx.replyWithChatAction('upload_photo');
                ctx.telegram
                    .sendMediaGroup(ctx.message.chat.id, [
                        {
                            type: 'photo',
                            media: e.url,
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
            });
        }
        if (newData.videos_links) {
            const VideoLinks = newData.videos_links;
            VideoLinks.forEach(async (e) => {
                ctx.replyWithChatAction('upload_video');
                ctx.replyWithVideo(
                    {
                        url: e.url,
                    },
                    {
                        caption: `@smvideosdl_bot`,
                    }
                ).then((res) => {
                    ctx.telegram.forwardMessage(
                        '@downloadedVideos',
                        res.chat.id,
                        res.message_id
                    );
                });
            });
        }

        // const { data } = await axios.post(
        //     'https://storiesig.info/api/convert',
        //     {
        //         url: ctx.message.text,
        //     },
        //     {
        //         headers: {
        //             'User-Agent':
        //                 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        //         },
        //     }
        // );
        // const type = data.url[0].type == 'mp4' ? 'video' : 'photo';
        // const url = data.url[0].url;
        // ctx.replyWithChatAction(`upload_${type}`);
        // ctx.telegram
        //     .sendMediaGroup(ctx.message.chat.id, [
        //         {
        //             type: type,
        //             media: url,
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
        const { data } = await axios.get(
            'https://instadownloader.co/instagram_post_data.php?url=' +
                ctx.message.text,
            {
                headers: {
                    'user-agent':
                        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
                },
            }
        );
        var newData = JSON.parse(data);
        if (
            newData.videos_links.length == 0 &&
            newData.images_links.length == 0
        ) {
            const newLinkArr = ctx.message.text.split('/');
            const newLink = `https://www.instagram.com/${newLinkArr[3]}/${newLinkArr[4]}`;
            const { data } = await axios.get(
                'https://instadownloader.co/insta_downloader.php?url=' +
                    newLink,
                {
                    headers: {
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                    },
                }
            );
            newData = JSON.parse(data);
        }
        if (newData.images_links) {
            const ImagesLinks = newData.images_links;
            ImagesLinks.forEach((e) => {
                ctx.replyWithChatAction('upload_photo');
                ctx.telegram
                    .sendMediaGroup(ctx.message.chat.id, [
                        {
                            type: 'photo',
                            media: e.url,
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
            });
        }
        if (newData.videos_links) {
            const VideoLinks = newData.videos_links;
            VideoLinks.forEach(async (e) => {
                ctx.replyWithChatAction('upload_video');
                ctx.replyWithVideo(
                    {
                        url: e.url,
                    },
                    {
                        caption: `@smvideosdl_bot`,
                    }
                ).then((res) => {
                    ctx.telegram.forwardMessage(
                        '@downloadedVideos',
                        res.chat.id,
                        res.message_id
                    );
                });
            });
        }
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
        var url = `https://www.instagram.com/${ctx.message.text.slice(1)}/`;
        const { data } = await axios.get(
            'https://instadownloader.co/instagram_profile_pic_data.php?url=' +
                url,
            {
                headers: {
                    'user-agent':
                        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
                },
            }
        );
        var newData = JSON.parse(data);
        if (newData.images_links) {
            const ImagesLinks = newData.images_links;
            ImagesLinks.forEach((e) => {
                ctx.replyWithChatAction('upload_photo');
                ctx.telegram
                    .sendMediaGroup(ctx.message.chat.id, [
                        {
                            type: 'photo',
                            media: e.url,
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
            });
        }
    } catch (err) {
        console.log(err);
    }
};
module.exports = { InstagramVideo, InstagramStories, ProfilePhoto };
