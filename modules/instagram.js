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
// https://instadownloader.co/instagram_post_data.php?path=%2Finstagram-story-download.php&url=https%3A%2F%2Fwww.instagram.com%2Fstories%2Fahadbekmunirov%2F2883040101828138435%2F

const InstagramStories = async (ctx) => {
    try {
        ctx.reply('⏳');
        const newLinkArr = ctx.message.text.split('/');
        const { data } = await axios.get(
            'https://instadownloader.co/instagram_post_data.php?path=%2Finstagram-story-download.php&url=https%3A%2F%2Fwww.instagram.com%2Fstories%2F' +
                newLinkArr[4] +
                '%2f' +
                newLinkArr[5],
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
        console.log(err);
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
            `https://instadownloader.co/instagram_profile_pic_data.php?path=%2Fprofile.php&url=https%3A%2F%2Fwww.instagram.com%2F${ctx.message.text.slice(
                1
            )}%2F`,
            {
                headers: {
                    'user-agent':
                        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
                },
            }
        );
        var newData = JSON.parse(data);
        console.log(newData);
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
